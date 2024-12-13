const now = new Date();
const timestamp = now
  .toISOString()
  .replace(/[:-]/g, "")
  .replace("T", "_")
  .split(".")[0];
// Example format: 20241213_103045
process.stdout.write(timestamp);
