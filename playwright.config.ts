import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  timeout: 30 * 1000,
  retries: process.env.CI ? 2 : 0,
  reporter: [
    ["list"],
    ["html", { outputFolder: "playwright-report", open: "never" }],
    ['allure-playwright']
  ],
  use: {
    headless: true, 
    viewport: { width: 1280, height: 720 },
    baseURL: process.env.BASE_URL || "http://demowebshop.tricentis.com",
    video: "retain-on-failure",
    screenshot: "only-on-failure",
    trace: 'on-first-retry',
    actionTimeout: 0,
  },
  projects: [
    {
      name: "chrome",
      use: { ...devices["Desktop Chrome"], headless: true, launchOptions: {slowMo: 300} },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
    {
      name: "pixel5",
      use: { ...devices["Pixel 5"] },
    },
    {
      name: "iphone13",
      use: { ...devices["iPhone 13"] },
    },
  ],
  outputDir: "./test-results/",
});
