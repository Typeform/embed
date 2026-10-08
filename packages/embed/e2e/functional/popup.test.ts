import { expect, expectSrc, mockForms, test } from '../support'

const pages = [
  ['html', '/popup-html.html'],
  ['javascript', '/popup-js.html'],
  ['server-side rendering', '/popup'],
]

for (const [title, path] of pages) {
  test(`Popup - ${title}`, async ({ page }) => {
    await mockForms(page)
    await page.goto(path)
    const popup = page.locator('.tf-v1-popup')
    await expect(popup, 'not displayed on page load').toHaveCount(0)

    await page.locator('button').first().click()
    await expect(popup).toBeVisible()
    await expectSrc(
      popup.locator('iframe'),
      'form.typeform.com/to/',
      'typeform-embed=popup-blank&typeform-source=localhost&typeform-medium=demo-test',
      '#foo=foo+value&bar=bar+value'
    )

    await page.locator('button.tf-v1-close').click()
    await expect(popup).toHaveCount(0)
  })
}
