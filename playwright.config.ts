import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/",
  snapshotPathTemplate: "baselines{/projectName}/{testFilePath}/{arg}{ext}",
  fullyParallel: true,
  timeout: 100000,
  reporter: "html",
  use: {
    trace: "on-first-retry",
  },

  projects: [
    {
      name: "chrome",
      use: {
        headless: true,
        viewport: { width: 1600, height: 1000 },
        channel: "chrome",
      },
    },
  ],
});
