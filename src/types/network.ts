export type DeviceType =
  | "pc"
  | "router"
  | "switch"
  | "firewall"
  | "server"
  | "laptop"
  | "printer"
  | "wireless-ap"
  | "cloud"
  | "modem"
  | "hub"
  | "bridge"
  | "load-balancer"
  | "nas"
  | "ip-phone"
  | "tablet"
  | "smartphone"
  | "access-point"
  | "controller"
  | "multilayer-switch"
  | "repeater"
  | "gateway"
  | "ids"
  | "ips"
  | "vpn-concentrator";

export interface NetworkNodeData {
  type: DeviceType;
  label: string;
}

export interface Packet {
  path: string[];
  index: number;
}
