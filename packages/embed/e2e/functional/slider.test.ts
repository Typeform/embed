import { expect, expectSrc, mockForms, test } from '../support'

const pages = [
  ['html', '/slider-html.html'],
  ['javascript', '/slider-js.html'],
  ['server-side rendering', '/slider'],
]

for (const [title, path] of pages) {
  test(`Slider - ${title}`, async ({ page }) => {
    await mockForms(page)
    await page.goto(`${path}?foo=foo&bar=bar&baz=baz`)
    const slider = page.locator('.tf-v1-slider')
    await expect(slider, 'not displayed on page load').toHaveCount(0)

    await page.locator('button').first().click()
    await expect(slider).toBeVisible()
    await expectSrc(
      slider.locator('iframe'),
      'form.typeform.com/to/',
      'typeform-embed=popup-drawer&typeform-source=localhost&typeform-medium=demo-test'
    )

    await page.locator('button.tf-v1-close').click()
    await expect(slider).toHaveCount(0)
  })
}
