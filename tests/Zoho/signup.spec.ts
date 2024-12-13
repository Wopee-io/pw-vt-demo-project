import { test } from "../../utils/fixtures";
import { checkPage } from "../../utils/wopee";

test.describe("Zoho Signup Page Testing - Demo", () => {
  const baseURL = "https://www.zoho.com/crm/signup.html";

  test("01 Signup", async ({ page, wopee }, testInfo) => {
    await page.goto(baseURL);
    await checkPage(page, wopee, testInfo.title, "Signup");
  });

  test("02 Signup, empty submit", async ({ page, wopee }, testInfo) => {
    await page.goto(baseURL);
    await page.click("input[data-zcqa='sgnp-button']");
    await checkPage(page, wopee, testInfo.title, "Signup - empty submit");
  });

  test("03 Page not exist", async ({ page, wopee }, testInfo) => {
    await page.goto(baseURL + "/not-exist");
    await checkPage(page, wopee, testInfo.title, "Page not exist");
  });
});
