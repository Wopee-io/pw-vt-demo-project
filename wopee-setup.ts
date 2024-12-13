import { Wopee } from "@wopee-io/wopee.pw";
require("dotenv").config();

async function globalSetup() {
  const suiteName =
    process.env.WOPEE_SUITE_NAME ||
    `Example ${new Date().toISOString().substring(0, 16)}`;
  const wopee = new Wopee();

  try {
    await wopee.startSuite(suiteName);
  } catch (error: any) {
    console.error(`Failed to start WOPEE suite '${suiteName}':`, error);
    throw new Error(`WOPEE suite start failed: ${error.message}`);
  }
  // You can store suiteName in a file or process.env for the tests to use.
  process.env.WOPEE_SUITE_NAME = suiteName;
}

export default globalSetup;
