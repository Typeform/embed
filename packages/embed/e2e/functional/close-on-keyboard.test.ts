import { expect, test } from '../support'

test.describe('Close on keyboard Esc event', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/popup-html.html')
    await page.locator('#button').click()
    await expect(page.locator('iframe')).toBeVisible()
  })

  test('should close the form with a keyboard event inside the iframe', async ({ page }) => {
    const form = page.frameLocator('iframe')
    await form.locator('button[role="radio"][value="2"]').click()
    await form.locator('textarea').press('Escape')
    await expect(page.locator('iframe')).toHaveCount(0)
  })

  test('should close the form with a keyboard event from the host window', async ({ page }) => {
    // The listener is added once the form is ready. The form owns the focus (inside the iframe), so dispatch the
    // event on the host document directly.
    await expect(page.frameLocator('iframe').locator('button[role="radio"]').first()).toBeVisible()
    await page.locator('body').dispatchEvent('keydown', { code: 'Escape', key: 'Escape' })
    await expect(page.locator('iframe')).toHaveCount(0)
  })
})
