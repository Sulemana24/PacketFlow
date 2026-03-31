export function findEdgePath(edges: any[], source: string, target: string) {
  const visited = new Set<string>();
  const queue: any[] = [[source]];

  while (queue.length) {
    const path = queue.shift();
    const node = path[path.length - 1];

    if (node === target) return path;

    if (!visited.has(node)) {
      visited.add(node);

      const neighbors = edges
        .filter((e) => e.source === node)
        .map((e) => e.target);

      for (const n of neighbors) {
        queue.push([...path, n]);
      }
    }
  }

  return null;
}
