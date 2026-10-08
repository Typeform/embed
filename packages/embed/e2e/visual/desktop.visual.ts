import { test } from './support'

test.describe('Desktop Embeds', () => {
  test('Popup Desktop', async ({ page, track }) => {
    await page.goto('/popup-js.html')
    await page.locator('#button').click({ force: true })
    await page.getByTestId('iframe').waitFor()
    await track(page, 'Popup Desktop')
  })

  test('Popover Desktop', async ({ page, track }) => {
    await page.goto('/popover-js.html')
    await page.locator('#button').click({ force: true })
    await page.getByTestId('iframe').waitFor()
    await track(page, 'Popover Desktop')
  })

  test('Slider Right Desktop', async ({ page, track }) => {
    await page.goto('/slider-js.html')
    await page.locator('#button').click({ force: true })
    await page.getByTestId('iframe').waitFor()
    await track(page, 'Slider Right Desktop')
  })

  test('Slider Left Desktop', async ({ page, track }) => {
    await page.goto('/slider-js.html')
    await page.locator('#button-left').click({ force: true })
    await page.getByTestId('iframe').waitFor()
    await track(page, 'Slider Left Desktop')
  })

  test('Sidetab Desktop', async ({ page, track }) => {
    await page.goto('/sidetab-js.html')
    await page.locator('button.tf-v1-sidetab-button').click({ force: true })
    await page.getByTestId('iframe').waitFor()
    // The title and footer text anti-alias differently between runs (up to ~0.3% of the pixels).
    await track(page, 'Sidetab Desktop', { diffTolerancePercent: 0.5 })
  })
})
