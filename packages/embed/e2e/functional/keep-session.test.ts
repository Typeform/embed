import { expect, mockForms, test } from '../support'

const scenarios = [
  { name: 'popup', openSelector: '#popup', closeSelector: 'button.tf-v1-close' },
  { name: 'slider', openSelector: '#slider', closeSelector: 'button.tf-v1-close' },
  { name: 'sidetab', openSelector: 'button.tf-v1-sidetab-button', closeSelector: 'button.tf-v1-sidetab-button' },
  { name: 'popover', openSelector: 'button.tf-v1-popover-button', closeSelector: 'button.tf-v1-popover-button' },
]

for (const { name, openSelector, closeSelector } of scenarios) {
  test(`Keep session - ${name}: should keep the iframe in the page when the modal is closed`, async ({ page }) => {
    await mockForms(page)
    await page.goto('/keep-session-html.html')
    const iframe = page.locator('iframe')
    await expect(iframe).toHaveCount(0)

    await page.locator(openSelector).click()
    await expect(iframe).toBeVisible()
    await expect(iframe).toHaveCount(1)

    await page.locator(closeSelector).click()
    await expect(iframe).toBeHidden()
    await expect(iframe).toHaveCount(1)

    await page.locator(openSelector).click()
    await expect(iframe).toBeVisible()
    await expect(iframe).toHaveCount(1)
  })
}
