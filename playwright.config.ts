import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : 2,
  reporter: "list",
  use: {
    baseURL: "http://127.0.0.1:4321/website-georg/",
    trace: "retain-on-failure",
    launchOptions: {
      executablePath:
        process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH || undefined,
    },
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
    {
      name: "mobile",
      use: { ...devices["iPhone 13"], defaultBrowserType: "chromium" },
    },
  ],
  webServer: [
    {
      command: "npm run dev -- --port 4321",
      url: "http://127.0.0.1:4321/website-georg/",
      reuseExistingServer: false,
      env: {
        BASE_PATH: "/website-georg",
        PUBLIC_CONTACT_ENDPOINT: "",
        PUBLIC_TURNSTILE_SITE_KEY: "",
        ASTRO_TELEMETRY_DISABLED: "1",
      },
    },
    {
      command: "npm run dev -- --port 4322",
      url: "http://127.0.0.1:4322/website-georg/",
      reuseExistingServer: false,
      env: {
        BASE_PATH: "/website-georg",
        PUBLIC_CONTACT_ENDPOINT: "https://contact.example.test/contact",
        PUBLIC_TURNSTILE_SITE_KEY: "test-site-key",
        ASTRO_TELEMETRY_DISABLED: "1",
      },
    },
  ],
});
