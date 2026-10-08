import { expect, test } from '../support'

// These two submit the real form (there is no sandbox on the demo page).
for (const [title, buttonId] of [
  ['JS', '#button-js'],
  ['HTML', '#button-html'],
]) {
  test(`Auto close - ${title}: should close the form after submit`, async ({ page }) => {
    await page.goto('/autoclose.html')
    await page.locator(buttonId).click()
    await expect(page.locator('iframe')).toBeVisible()

    const form = page.frameLocator('iframe')
    await form.locator('button[role="radio"][value="10"]').click()
    await form.locator('[data-qa*="submit-button"]').last().click()

    await expect(page.locator('iframe')).toHaveCount(0, { timeout: 10000 })
  })
}
