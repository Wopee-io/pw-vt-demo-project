import { expect } from "@playwright/test";
import { test } from "../../utils/fixtures";
import { checkPage } from "../../utils/wopee";

test.describe("Amazon - AI Visual Assertion Demo", () => {
  const baseURL = "https://www.amazon.com/404";

  test("01 Error page", async ({ page, wopee }, testInfo) => {
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
      composeMessage(status, confidence, message)
    );
    expect(status).toBe("passed");
    expect(confidence).toBeGreaterThan(80);

    console.log(message);
  });

  test("02 Error page - language is Spanish", async ({
    page,
    wopee,
  }, testInfo) => {
    await page.goto(baseURL);
    await page.waitForSelector("[name='field-keywords']");

    const { status, confidence, message } = await wopee.visualAssert({
      page,
      prompt: "Check if page is in Spanish.",
      context: "Error page 404 of Amazon",
    });

    await testInfo.attach("Visual Assertion Message", {
      body: composeMessage(status, confidence, message),
      contentType: "text/plain",
    });

    // Uncomment to fail the test - might be implemented as soft or hard assertion
    //
    // expect(status).toBe("passed");
    // expect(confidence).toBeGreaterThan(80);
  });
});

function composeMessage(status: string, confidence: number, message: string) {
  return `Status: ${
    status === "passed" ? "✅" : "❌"
  } \nConfidence: ${confidence} \n\nMessage:\n${message}`;
}
