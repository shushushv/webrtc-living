export default function log (...args: string[]) {
  console.log(`[${new Date().toISOString()}][Server]`, ...args);
}