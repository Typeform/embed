import { expect, test, type Locator, type Page } from '@playwright/test'

export { expect, test }

export const FORM_ID = 'HLjqXS5W'

export const desktopViewport = { width: 1024, height: 768 }
export const mobileViewport = { width: 375, height: 667 }

// The embed treats these user agents as mobile and any screen below 1024x768 as small.
export const mobileOptions = {
  viewport: mobileViewport,
  screen: mobileViewport,
  userAgent: 'playwright mobile browser',
}

// Most tests only look at the iframe attributes, so they serve a blank page instead of loading the real form:
// faster and independent of the network. Tests that interact with the form must not call this.
export const mockForms = (page: Page) =>
  page.route(/^https:\/\/form\.typeform\.(com|eu)\//, (route) =>
    route.fulfill({ contentType: 'text/html', body: '<!doctype html><title>form</title>' })
  )

const escapeRegExp = (text: string) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

// Asserts that an iframe's `src` contains every given text, e.g. `expectSrc(iframe, 'popup-blank', '#foo=foo+value')`.
export const expectSrc = async (iframe: Locator, ...parts: string[]) => {
  for (const part of parts) {
    await expect(iframe).toHaveAttribute('src', new RegExp(escapeRegExp(part)))
  }
}

// Clicks the form's button until the widget goes fullscreen (close button visible) on mobile. The button exists
// before the form's handlers are attached, so a single click can be lost; and it can be scrolled out of the iframe
// viewport, hence `force`.
export const startWidgetOnMobile = async (page: Page) => {
  await expect(async () => {
    await page.frameLocator('iframe').locator('[data-qa*="ok-button"]').first().click({ force: true, timeout: 2000 })
    await expect(page.locator('.tf-v1-widget-close')).toBeVisible({ timeout: 1500 })
  }).toPass({ timeout: 15000 })
}
