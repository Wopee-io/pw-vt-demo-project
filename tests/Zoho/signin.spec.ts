import { test } from "../../utils/fixtures";
import { checkPage } from "../../utils/wopee";

test.describe("Zoho Signing Page Testing - Demo", () => {
  const baseURL = "https://accounts.zoho.eu";

  test("01 Signin", async ({ page, wopee }, testInfo) => {
    await page.goto(baseURL + "/signin");
    await checkPage(page, wopee, testInfo.title, "Signin");
  });

  test("02 Signin - ZohoCRM", async ({ page, wopee }, testInfo) => {
    await page.goto(baseURL + "/signin?servicename=ZohoCRM");
    await checkPage(page, wopee, testInfo.title, "Signin - ZohoCRM");
  });

  test("03 Signin, empty submit", async ({ page, wopee }, testInfo) => {
    await page.goto(baseURL + "/signin");
    await page.click("button >> text=Next");
    await checkPage(page, wopee, testInfo.title, "Signin - empty submit");
  });

  test("04 Signin, empty submit - ZohoCRM", async ({
    page,
    wopee,
  }, testInfo) => {
    await page.goto(baseURL + "/signin?servicename=ZohoCRM");
    await page.click("button >> text=Next");
    await checkPage(
      page,
      wopee,
      testInfo.title,
      "Signin - empty submit - ZohoCRM"
    );
  });
});
