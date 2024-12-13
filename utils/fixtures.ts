import { test as base } from "@playwright/test";
import { Wopee } from "@wopee-io/wopee.pw";

require("dotenv").config();

const suiteName = process.env.WOPEE_SUITE_NAME || "Wopee Demo";

type wopeeFixture = {
  wopee: Wopee;
};

const test = base.extend<wopeeFixture>({
  wopee: async ({}, use) => {
    const wopee = new Wopee();

    try {
      await wopee.startSuite(suiteName);
    } catch (error: any) {
      console.error(`Failed to start WOPEE suite '${suiteName}':`, error);
      throw new Error(`WOPEE suite start failed: ${error.message}`);
    }

    await use(wopee);
  },
});

test.afterEach(async ({ wopee }) => {
  try {
    await wopee.stopScenario();
  } catch (error: any) {
    console.error("Failed to stop WOPEE scenario:", error);
    // Throw the error to indicate test teardown failure
    throw new Error(`WOPEE scenario stop failed: ${error.message}`);
  }
});

export { test };
