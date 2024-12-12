import { Wopee } from "@wopee-io/wopee.pw";
import { test } from "@playwright/test";
require("dotenv").config();

test.describe("Dento demo", () => {
  const baseURL = "http://test--dentoapp.netlify.app";

  let wopee: Wopee;

  test("01 Homepage", async ({ page }) => {
    await page.goto(baseURL + "/");
    await checkPage(page, wopee, "Home Page");
  });

  test("02 Carousels", async ({ page }) => {
    await page.goto(baseURL + "/");

    await checkCarousel(page, wopee, 1);
    await checkCarousel(page, wopee, 2);
    await checkCarousel(page, wopee, 3);
    await checkCarousel(page, wopee, 4);
    await checkCarousel(page, wopee, 5);
  });

  test("03 Checking subpages", async ({ page }) => {
    // Pages to check
    const pages = ["/jak-to-funguje", "/produkty", "/prihlaseni", "/faq"];

    for (const p of pages) {
      await page.goto(baseURL + p);
      await checkPage(page, wopee, p);
    }
  });

  //

  //

  //
  // Supporting functions - TODO: move to a separate file / folder
  //
  test.beforeAll(async () => {
    wopee = new Wopee();
    await wopee.startSuite(
      process.env.WOPEE_SUITE_NAME ||
        `Example ${new Date().toISOString().substring(0, 16)}`
    );
  });

  test.beforeEach(async () => {
    await wopee.startScenario(
      test.info().title + " - " + test.info().project.name
    );
  });

  test.afterEach(async () => {
    await wopee.stopScenario();
  });
});

async function checkCarousel(page, wopee, number) {
  await page.click(`span.swiper-pagination-bullet >> nth=${number - 1}`);
  await wopee.trackElement({
    stepName: "Carousel " + number,
    locator: page.locator("div.swiper"),
    suiteName: process.env.WOPEE_SUITE_NAME,
    // customTags: test.info().project.name,
  });
}

async function checkPage(page, wopee, stepName) {
  // Hack for lazy loading
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForLoadState("networkidle");

  await wopee.trackFullPage({
    page,
    stepName,
    suiteName: process.env.WOPEE_SUITE_NAME,
  });
}
