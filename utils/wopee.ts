async function checkPage(page, wopee, scenarioName, stepName) {
  await page.waitForLoadState("networkidle");
  await wopee.trackFullPage({
    page,
    stepName,
    scenarioName,
    suiteName: process.env.WOPEE_SUITE_NAME,
  });
}

export { checkPage };
