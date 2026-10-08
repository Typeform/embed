import { test, expect } from './support'

// Closed states: the launcher UI is owned by the embed SDK, not by the form.
test.describe('Embed Launchers', () => {
  test('Popover Launcher', async ({ page, track }) => {
    await page.goto('/popover-js.html')
    await expect(page.getByTestId('tf-v1-popover-button')).toBeVisible()
    await track(page, 'Popover Launcher', { waitForForms: false })
  })

  test('Popover Custom Icon Launcher', async ({ page, track }) => {
    await page.goto('/popover-js.html')
    await page.locator('#button-custom-icon').click({ force: true })
    const icon = page.getByTestId('tf-v1-popover-button').locator('img')
    await expect(icon).toBeVisible()
    await expect
      .poll(() => icon.evaluate((img: HTMLImageElement) => img.naturalWidth), { message: 'custom icon loaded' })
      .toBeGreaterThan(0)
    await track(page, 'Popover Custom Icon Launcher', { waitForForms: false })
  })

  test('Sidetab Button', async ({ page, track }) => {
    await page.goto('/sidetab-js.html')
    await expect(page.locator('button.tf-v1-sidetab-button')).toBeVisible()
    await track(page, 'Sidetab Button', { waitForForms: false })
  })
})
