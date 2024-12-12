import { suiteName } from "./fixtures";

async function checkPage(page, wopee, scenarioName, stepName) {
  await wopee.trackFullPage({
    page,
    stepName,
    scenarioName,
    suiteName,
  });
}

export { checkPage };
