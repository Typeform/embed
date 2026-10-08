import { test, expect, mobileOptions } from './support'

test.describe('Embed Widget', () => {
  test('Basic Embed Widget - Desktop', async ({ page, track }) => {
    await page.goto('/widget-js.html')
    await page.getByTestId('iframe').waitFor()
    await track(page, 'Basic Embed Widget - Desktop')
  })

  test.describe('Mobile', () => {
    test.use(mobileOptions)

    test('Basic Embed Widget - Mobile fullscreen view', async ({ page, track }) => {
      await page.goto('/widget-js.html')
      // The form's button exists before its handlers are attached, so a single click can be lost.
      await expect(async () => {
        await page
          .frameLocator('iframe')
          .locator('[data-qa*="ok-button"]')
          .first()
          .click({ force: true, timeout: 2000 })
        await expect(page.locator('.tf-v1-widget-close')).toBeVisible({ timeout: 1500 })
      }).toPass({ timeout: 15000 })
      await track(page, 'Basic Embed Widget - Mobile fullscreen view')
    })

    test('Basic Embed Widget - Mobile inline view', async ({ page, track }) => {
      await page.goto('/widget-inline.html')
      await page.getByTestId('iframe').waitFor()
      await track(page, 'Basic Embed Widget - Mobile inline view')
    })
  })
})
