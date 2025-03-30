import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  globalSetup: "./wopee-setup.ts",

  testDir: "./tests/",
  snapshotPathTemplate: "baselines{/projectName}/{testFilePath}/{arg}{ext}",
  fullyParallel: true,
  // timeout: 100000,
  reporter: "html",
  retries: 3,
  use: {
    screenshot: "only-on-failure",
    trace: "on-first-retry",
    baseURL: "http://localhost:3000",
  },

  // https://github.com/microsoft/playwright/blob/main/packages/playwright-core/src/server/deviceDescriptorsSource.json
  projects: [
    {
      name: "Chromium",
      use: { ...devices["Desktop Chrome"] },
    },

    {
      name: "Firefox",
      use: { ...devices["Desktop Firefox"] },
    },

    {
      name: "Webkit",
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
});
