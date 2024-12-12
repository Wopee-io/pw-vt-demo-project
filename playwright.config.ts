import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/",
  snapshotPathTemplate: "baselines{/projectName}/{testFilePath}/{arg}{ext}",
  fullyParallel: true,
  // timeout: 100000,
  reporter: "html",
  use: {
    screenshot: "only-on-failure",
    trace: "on-first-retry",
    baseURL: "http://localhost:3000",
  },

  // https://github.com/microsoft/playwright/blob/main/packages/playwright-core/src/server/deviceDescriptorsSource.json
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },

    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },

    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },

    /* Test against mobile viewports. */
    {
      name: "Mobile Chrome",
      use: { ...devices["Pixel 5"] },
    },
    {
      name: "Mobile Safari",
      use: { ...devices["iPhone 12"] },
    },
    {
      name: "Mobile Safari (Rotated)",
      use: { ...devices["iPhone 12 landscape"] },
    },

    /* Test against branded browsers. */
    {
      name: "Google Chrome",
      use: {
        ...devices["Desktop Chrome"],
        channel: "chrome",
      },
    },
  ],

  // projects: [
  //   {
  //     name: "chrome",
  //     use: {
  //       headless: true,
  //       viewport: { width: 1600, height: 1000 },
  //       channel: "chrome",
  //     },
  //   },
  // ],
});
