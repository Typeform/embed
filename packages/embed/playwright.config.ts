import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './visual-tests',
  testMatch: '*.visual.ts',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  // VRT retries resend the same screenshot file, and a retried test would add unresolved runs to the build
  retries: 0,
  workers: 1,
  timeout: 60000,
  globalTimeout: process.env.CI ? 20 * 60 * 1000 : undefined,
  reporter: process.env.CI ? [['list'], ['github'], ['html', { open: 'never' }]] : 'list',
  use: {
    baseURL: 'http://localhost:9090',
    ...devices['Desktop Chrome'],
    // The embed decides what to show from the screen size, so keep it equal to the viewport
    viewport: { width: 1024, height: 768 },
    screen: { width: 1024, height: 768 },
    deviceScaleFactor: 1,
    trace: 'retain-on-failure',
  },
  projects: [{ name: 'chromium' }],
  webServer: {
    command: 'yarn demo',
    url: 'http://localhost:9090/popup-js.html',
    reuseExistingServer: !process.env.CI,
    timeout: 3 * 60 * 1000,
  },
})
