import { test } from "../../utils/fixtures";
import { checkPage } from "../../utils/wopee";

import axios from "axios";
import { parseStringPromise } from "xml2js";

const sitemapUrl = "https://wopee.io/sitemap.xml";

let urls: string[] = [];

test.describe("Sitemaps - Demo", async () => {
  test.beforeAll(async () => {
    urls = await fetchSitemapUrls(sitemapUrl);
  });

  test("01 Sitemap", async ({ page, wopee }, testInfo) => {
    for (const url of urls) {
      const stepName = `Page: ${url}`;

      await page.goto(url);
      await checkPage(page, wopee, testInfo.project.name, stepName);
    }
  });
});

async function fetchSitemapUrls(sitemapUrl: string): Promise<string[]> {
  const response = await axios.get(sitemapUrl);
  const xml = response.data;
  const parsedData = await parseStringPromise(xml);

  const urls = parsedData?.urlset?.url?.map(
    (url: { loc: string[] }) => url.loc[0]
  );

  return urls || [];
}
