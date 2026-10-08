import { expect, expectSrc, mockForms, test } from '../support'

const pages = [
  ['html', '/sidetab-html.html'],
  ['javascript', '/sidetab-js.html'],
  ['server-side rendering', '/sidetab'],
]

for (const [title, path] of pages) {
  test(`Sidetab - ${title}`, async ({ page }) => {
    await mockForms(page)
    await page.goto(path)
    const button = page.locator('.tf-v1-sidetab-button')
    const wrapper = page.locator('.tf-v1-sidetab-wrapper')
    const defaultIcon = button.getByTestId('default-icon')
    const openIcon = button.getByTestId('tf-v1-sidetab-button-icon')

    await expect(button, 'button displayed on page load').toBeVisible()
    await expect(defaultIcon).toBeVisible()
    await expect(button).toContainText('open sidetab')
    await expect(wrapper, 'sidetab not displayed on page load').toHaveCount(0)

    await button.click()
    await expect(wrapper).toBeVisible()
    await expectSrc(
      wrapper.locator('iframe'),
      'form.typeform.com/to/',
      'typeform-embed=popup-side-panel&typeform-source=localhost&typeform-medium=demo-test',
      '#foo=foo+value&bar=bar+value'
    )
    await expect(defaultIcon).toHaveCount(0)
    await expect(openIcon).toHaveCount(1)

    await button.click()
    await expect(defaultIcon).toHaveCount(1)
    await expect(openIcon).toHaveCount(0)
    await expect(wrapper).toHaveCount(0)
  })
}
