import { expect } from "@playwright/test";
import { test } from "../../utils/fixtures";
import { checkPage } from "../../utils/wopee";

test.describe("Amazon - AI Visual Assertion Demo", () => {
  const baseURL = "https://www.amazon.com/404";

  test("01 Homepage", async ({ page, wopee }, testInfo) => {
    await page.goto(baseURL);
    await page.waitForSelector("[name='field-keywords']");

    const { status, confidence, message } = await wopee.visualAssert({
      page,
      prompt: "Check if the page is the Amazon 404 page and displays a dog.",
      context: "",
    });

    await checkPage(
      page,
      wopee,
      testInfo.title,
      testInfo.project.name,
      1,
      `Status: ${
        status === "passed" ? "✅" : "❌"
      } \nConfidence: ${confidence} \n\nMessage:\n${message}`
    );
    expect(status).toBe("passed");
    expect(confidence).toBeGreaterThan(80);

    console.log(message);
  });
});
