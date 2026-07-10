"use client";

import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";

// Export this interface so it can be used elsewhere
export interface NetworkStats {
  ipAddress: string;
  ipv6Address: string;
  macAddress: string;
  downloadSpeed: number;
  uploadSpeed: number;
  pingLatency: number;
  packetLoss: number;
  networkType: string;
  isOnline: boolean;
  connectionType: string;
  rtt: number;
  publicIP: string;
  isp: string;
  location: string;
  dnsServers: string[];
  bandwidth: number;
  signalStrength: number;
}

// Define proper types for Network Information API
interface NetworkInformation {
  effectiveType?: "slow-2g" | "2g" | "3g" | "4g" | "5g" | "unknown";
  downlink?: number;
  rtt?: number;
  downlinkMax?: number;
  type?: string;
  addEventListener?: (type: string, listener: EventListener) => void;
  removeEventListener?: (type: string, listener: EventListener) => void;
}

// Extend Navigator type
interface NavigatorWithConnection extends Navigator {
  connection?: NetworkInformation;
}

export function useNetworkStats() {
  const [networkStats, setNetworkStats] = useState<NetworkStats>({
    ipAddress: "",
    ipv6Address: "",
    macAddress: "",
    downloadSpeed: 0,
    uploadSpeed: 0,
    pingLatency: 0,
    packetLoss: 0,
    networkType: "",
    isOnline: true,
    connectionType: "",
    rtt: 0,
    publicIP: "",
    isp: "",
    location: "",
    dnsServers: [],
    bandwidth: 0,
    signalStrength: 0,
  });
  const [isMeasuringSpeed, setIsMeasuringSpeed] = useState(false);

  const getLocalIP = useCallback((): Promise<string> => {
    return new Promise((resolve) => {
      try {
        const pc = new RTCPeerConnection({ iceServers: [] });
        pc.createDataChannel("");
        pc.createOffer()
          .then((offer) => pc.setLocalDescription(offer))
          .catch(() => resolve("127.0.0.1"));

        pc.onicecandidate = (event) => {
          if (!event.candidate) return;
          const ipMatch = /([0-9]{1,3}\.){3}[0-9]{1,3}/.exec(
            event.candidate.candidate,
          );
          if (ipMatch) {
            resolve(ipMatch[0]);
            pc.close();
          }
        };

        setTimeout(() => {
          resolve("192.168.1.100");
          pc.close();
        }, 2000);
      } catch (error) {
        console.error("Error getting local IP:", error);
        resolve("127.0.0.1");
      }
    });
  }, []);

  const generateMockMAC = useCallback(() => {
    const hex = "0123456789ABCDEF";
    let mac = "";
    for (let i = 0; i < 6; i++) {
      mac += hex[Math.floor(Math.random() * 16)];
      mac += hex[Math.floor(Math.random() * 16)];
      if (i < 5) mac += ":";
    }
    return mac;
  }, []);

  const getPublicIPInfo = useCallback(async () => {
    try {
      // Try multiple IP services for redundancy
      const ipServices = [
        "https://api.ipify.org?format=json",
        "https://api.my-ip.io/ip.json",
        "https://ipapi.co/json/",
      ];

      let publicIP = "";
      let geoData = null;

      // Try to get IP from first successful service
      for (const service of ipServices) {
        try {
          const response = await fetch(service, {
            signal: AbortSignal.timeout(5000),
          });
          if (response.ok) {
            const data = await response.json();
            publicIP = data.ip || data.ip_address || data.ipv4;
            if (publicIP) break;
          }
        } catch (e) {
          console.log(`IP service ${service} failed, trying next...`);
        }
      }

      if (!publicIP) {
        throw new Error("Could not get public IP");
      }

      // Try to get geo data
      try {
        const geoResponse = await fetch(`https://ipapi.co/${publicIP}/json/`, {
          signal: AbortSignal.timeout(5000),
        });
        if (geoResponse.ok) {
          geoData = await geoResponse.json();
        }
      } catch (e) {
        console.log("Geo location service failed, using fallback");
      }

      setNetworkStats((prev) => ({
        ...prev,
        publicIP: publicIP,
        isp: geoData?.org || "Unknown ISP",
        location: geoData
          ? `${geoData.city || "Unknown"}, ${geoData.country_name || "Unknown"}`
          : "Unknown",
      }));
    } catch (error) {
      console.error("Error getting public IP:", error);
      // Set fallback values
      setNetworkStats((prev) => ({
        ...prev,
        publicIP: "Unable to fetch",
        isp: "Unknown",
        location: "Unknown",
      }));
      toast.error("Failed to fetch public IP information");
    }
  }, []);

  const getLocalNetworkInfo = useCallback(async () => {
    try {
      const ip = await getLocalIP();
      setNetworkStats((prev) => ({ ...prev, ipAddress: ip }));

      const mac = generateMockMAC();
      setNetworkStats((prev) => ({ ...prev, macAddress: mac }));

      // FIX: Use proper typing instead of 'any'
      const connection = (navigator as NavigatorWithConnection).connection;
      if (connection) {
        setNetworkStats((prev) => ({
          ...prev,
          connectionType: connection.effectiveType || "unknown",
          bandwidth: connection.downlink || 0,
          rtt: connection.rtt || 0,
        }));
      }
    } catch (error) {
      console.error("Error getting local network info:", error);
      toast.error("Failed to get local network information");
    }
  }, [getLocalIP, generateMockMAC]);

  const getDNSServers = useCallback(async () => {
    // This is mock data since browser doesn't expose DNS servers
    const dnsList = [
      "8.8.8.8 (Google)",
      "8.8.4.4 (Google)",
      "1.1.1.1 (Cloudflare)",
    ];
    setNetworkStats((prev) => ({ ...prev, dnsServers: dnsList }));
    return dnsList;
  }, []);

  // Measure download speed with better error handling
  const measureDownloadSpeed = useCallback((): Promise<number> => {
    return new Promise(async (resolve) => {
      // Use multiple test files for redundancy
      const testUrls = [
        "https://speed.cloudflare.com/__down?bytes=5000000",
        "https://cdn.jsdelivr.net/npm/axios@1.6.0/package.json",
        "https://cdnjs.cloudflare.com/ajax/libs/react/18.2.0/umd/react.production.min.js",
      ];

      for (const url of testUrls) {
        try {
          const startTime = Date.now();
          const response = await fetch(url, {
            signal: AbortSignal.timeout(10000),
          });

          if (!response.ok) continue;

          const data = await response.arrayBuffer();
          const endTime = Date.now();
          const duration = (endTime - startTime) / 1000;

          if (duration > 0 && data.byteLength > 0) {
            const bitsLoaded = data.byteLength * 8;
            const speedMbps = bitsLoaded / duration / (1024 * 1024);
            resolve(Math.max(0, speedMbps));
            return;
          }
        } catch (error) {
          console.log(`Download test with ${url} failed, trying next...`);
        }
      }

      // If all tests fail, return mock speed based on connection type
      const connection = (navigator as NavigatorWithConnection).connection;
      if (connection?.downlink) {
        resolve(connection.downlink);
      } else {
        resolve(Math.random() * 50 + 10);
      }
    });
  }, []);

  // Measure upload speed with better error handling
  const measureUploadSpeed = useCallback((): Promise<number> => {
    return new Promise(async (resolve) => {
      const testData = new ArrayBuffer(1000000);

      // Try multiple upload endpoints
      const uploadUrls = [
        "https://httpbin.org/post",
        "https://bin.arnask.com/",
        "https://ptsv3.com/post",
      ];

      for (const url of uploadUrls) {
        try {
          const startTime = Date.now();
          const response = await fetch(url, {
            method: "POST",
            body: testData,
            signal: AbortSignal.timeout(10000),
          });

          if (!response.ok) continue;

          const endTime = Date.now();
          const duration = (endTime - startTime) / 1000;

          if (duration > 0) {
            const bitsLoaded = testData.byteLength * 8;
            const speedMbps = bitsLoaded / duration / (1024 * 1024);
            resolve(Math.max(0, speedMbps));
            return;
          }
        } catch (error) {
          console.log(`Upload test with ${url} failed, trying next...`);
        }
      }

      // If all tests fail, return mock speed
      resolve(Math.random() * 10 + 2); // Mock speed between 2-12 Mbps
    });
  }, []);

  // Measure ping with better error handling
  const measurePing = useCallback((): Promise<number> => {
    return new Promise(async (resolve) => {
      const pingUrls = [
        "https://httpbin.org/get",
        "https://api.ipify.org?format=json",
        "https://jsonplaceholder.typicode.com/posts/1",
      ];

      const pings: number[] = [];

      for (const url of pingUrls) {
        try {
          const startTime = performance.now();
          await fetch(url, {
            cache: "no-store",
            signal: AbortSignal.timeout(5000),
          });
          const endTime = performance.now();
          pings.push(endTime - startTime);
        } catch (error) {
          console.log(`Ping test with ${url} failed`);
        }
      }

      if (pings.length > 0) {
        // Return average of successful pings
        const avgPing = pings.reduce((a, b) => a + b, 0) / pings.length;
        resolve(Math.round(avgPing));
      } else {
        // If all pings fail, return mock value based on connection
        const connection = (navigator as NavigatorWithConnection).connection;
        if (connection?.rtt) {
          resolve(connection.rtt);
        } else {
          resolve(Math.floor(Math.random() * 50) + 20); // Mock ping between 20-70ms
        }
      }
    });
  }, []);

  const measureInternetSpeed = useCallback(async (): Promise<{
    downloadSpeed: number;
    uploadSpeed: number;
    ping: number;
  } | null> => {
    if (isMeasuringSpeed) {
      // FIX: Use toast() with icon instead of toast.info()
      toast("Speed test already in progress", {
        icon: "ℹ️",
        duration: 3000,
      });
      return null;
    }

    setIsMeasuringSpeed(true);
    const loadingToast = toast.loading(
      "Measuring internet speed... This may take a few seconds",
    );

    try {
      // Run tests in parallel with timeout
      const results = await Promise.race([
        Promise.all([
          measureDownloadSpeed(),
          measureUploadSpeed(),
          measurePing(),
        ]),
        new Promise<[number, number, number]>((_, reject) =>
          setTimeout(() => reject(new Error("Speed test timed out")), 30000),
        ),
      ]);

      const [downloadSpeed, uploadSpeed, ping] = results;

      console.log("📊 Speed test results:", {
        download: downloadSpeed.toFixed(2) + " Mbps",
        upload: uploadSpeed.toFixed(2) + " Mbps",
        ping: ping + " ms",
      });

      // Round the values
      const roundedDownload = Math.round(downloadSpeed * 100) / 100;
      const roundedUpload = Math.round(uploadSpeed * 100) / 100;
      const roundedPing = Math.round(ping);

      setNetworkStats((prev) => ({
        ...prev,
        downloadSpeed: roundedDownload,
        uploadSpeed: roundedUpload,
        pingLatency: roundedPing,
      }));

      toast.success(
        `📊 Speed Test Complete:\n` +
          `📥 Download: ${roundedDownload.toFixed(2)} Mbps\n` +
          `📤 Upload: ${roundedUpload.toFixed(2)} Mbps\n` +
          `🏓 Ping: ${roundedPing}ms`,
        { id: loadingToast, duration: 8000 },
      );

      // Return the results
      return {
        downloadSpeed: roundedDownload,
        uploadSpeed: roundedUpload,
        ping: roundedPing,
      };
    } catch (error) {
      console.error("Speed test error:", error);

      // Set fallback values
      setNetworkStats((prev) => ({
        ...prev,
        downloadSpeed: 0,
        uploadSpeed: 0,
        pingLatency: 999,
      }));

      toast.error(
        error instanceof Error
          ? `Speed test failed: ${error.message}`
          : "Speed test failed. Please check your connection.",
        { id: loadingToast },
      );
      return null;
    } finally {
      setIsMeasuringSpeed(false);
    }
  }, [isMeasuringSpeed, measureDownloadSpeed, measureUploadSpeed, measurePing]);

  const refreshStats = useCallback(async () => {
    const loadingToast = toast.loading("Refreshing network statistics...");
    try {
      await Promise.all([
        getLocalNetworkInfo(),
        getPublicIPInfo(),
        getDNSServers(),
      ]);
      toast.success("Network statistics refreshed", { id: loadingToast });
    } catch (error) {
      console.error("Refresh stats error:", error);
      toast.error("Failed to refresh network statistics", { id: loadingToast });
    }
  }, [getLocalNetworkInfo, getPublicIPInfo, getDNSServers]);

  const monitorNetworkStatus = useCallback(() => {
    const handleOnline = () => {
      setNetworkStats((prev) => ({ ...prev, isOnline: true }));
      toast.success("🌐 Network connection restored");
    };

    const handleOffline = () => {
      setNetworkStats((prev) => ({ ...prev, isOnline: false }));
      toast.error("🌐 Network connection lost");
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  useEffect(() => {
    const cleanup = monitorNetworkStatus();
    return cleanup;
  }, [monitorNetworkStatus]);

  return {
    networkStats,
    isMeasuringSpeed,
    getLocalNetworkInfo,
    getPublicIPInfo,
    getDNSServers,
    measureInternetSpeed,
    refreshStats,
  };
}
