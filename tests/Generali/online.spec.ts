import { test } from "../../utils/fixtures";
import { checkPage } from "../../utils/wopee";

import websites from "./websites.json";

test.describe("Generali Visual Testing - Demo", () => {
  for (const website of websites) {
    const scenarioName = `Generali: ${website.name}`;
    test(scenarioName, async ({ page, wopee }, testInfo) => {
      await page.goto(website.url);
      await page.click(website.cookieLocator);

      await checkPage(
        page,
        wopee,
        scenarioName,
        testInfo.project.name,
        undefined,
        website.url
      );
    });
  }
});
