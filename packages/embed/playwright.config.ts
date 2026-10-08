import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './e2e',
  forbidOnly: !!process.env.CI,
  workers: process.env.CI ? 3 : undefined,
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
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'functional',
      testDir: './e2e/functional',
      testMatch: '*.test.ts',
      fullyParallel: true,
      retries: process.env.CI ? 2 : 0,
    },
    {
      name: 'visual',
      testDir: './e2e/visual',
      testMatch: '*.visual.ts',
      // VRT retries resend the same screenshot, and a retried test would add unresolved runs to the build
      retries: 0,
    },
  ],
  webServer: {
    command: 'yarn demo',
    url: 'http://localhost:9090/popup-js.html',
    reuseExistingServer: !process.env.CI,
    timeout: 3 * 60 * 1000,
  },
})
