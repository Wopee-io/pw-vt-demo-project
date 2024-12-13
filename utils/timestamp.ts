const now = new Date();
const timestamp = now
  .toISOString()
  .replace(/[:-]/g, "")
  .replace("T", "-")
  .split(".")[0];

export { timestamp };
