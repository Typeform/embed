import { test, mobileOptions } from './support'

test.use(mobileOptions)

// All four open the same fullscreen form on mobile; they guard that each embed type goes fullscreen.
test.describe('Mobile Embeds', () => {
  test('Popover fullscreen', async ({ page, track }) => {
    await page.goto('/popover-js.html')
    await page.locator('#button').click({ force: true })
    await page.getByTestId('iframe').waitFor()
    await track(page, 'Popover Mobile')
  })

  test('Popup fullscreen', async ({ page, track }) => {
    await page.goto('/popup-js.html')
    await page.locator('#button').click({ force: true })
    await page.getByTestId('iframe').waitFor()
    await track(page, 'Popup Mobile')
  })

  test('Sidetab fullscreen', async ({ page, track }) => {
    await page.goto('/sidetab-js.html')
    await page.locator('button.tf-v1-sidetab-button').click({ force: true })
    await page.getByTestId('iframe').waitFor()
    await track(page, 'Sidetab Mobile')
  })

  test('Slider fullscreen', async ({ page, track }) => {
    await page.goto('/slider-js.html')
    await page.locator('#button').click({ force: true })
    await page.getByTestId('iframe').waitFor()
    await track(page, 'Slider Mobile')
  })
})
