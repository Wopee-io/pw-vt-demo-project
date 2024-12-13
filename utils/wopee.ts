require("dotenv").config();
import { expect } from "@playwright/test";

async function checkPage(page, wopee, scenarioName, stepName, retries = 1) {
  let attempt = 0;

  while (attempt <= retries) {
    const wopeeResult = await wopee.trackFullPage({
      page,
      stepName,
      scenarioName,
      suiteName: process.env.WOPEE_SUITE_NAME,
    });

    if (wopeeResult.status !== "unresolved") return;

    console.log(
      `\x1b[33mWopee.io result unresolved for step "${stepName}" in scenario "${scenarioName}" (Attempt ${
        attempt + 1
      }). Retrying...\x1b[0m`
    );

    attempt++;

    if (attempt > retries) {
      const wopeeHardAssert = process.env.WOPEE_HARD_ASSERT === "true";

      if (wopeeHardAssert) {
        expect(
          true,
          `Wopee.io result unresolved after ${retries} retries. Visual Test Failed for step "${stepName}" in scenario "${scenarioName}".`
        ).toBeFalsy();
      } else {
        console.warn(
          `\x1b[33mWopee.io result unresolved after ${retries} retries. Test continuing without failure for step "${stepName}" in scenario "${scenarioName}".\x1b[0m`
        );
      }
    }
  }
}

export { checkPage };
