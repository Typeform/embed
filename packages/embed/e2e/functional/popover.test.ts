import { expect, expectSrc, mockForms, test } from '../support'

const pages = [
  ['html', '/popover-html.html'],
  ['javascript', '/popover-js.html'],
  ['server-side rendering', '/popover'],
]

for (const [title, path] of pages) {
  test(`Popover - ${title}`, async ({ page }) => {
    await mockForms(page)
    await page.goto(path)
    const button = page.locator('.tf-v1-popover-button')
    const wrapper = page.locator('.tf-v1-popover-wrapper')
    const defaultIcon = button.getByTestId('default-icon')
    const openIcon = button.getByTestId('tf-v1-popover-button-icon')

    await expect(button, 'button displayed on page load').toBeVisible()
    await expect(defaultIcon).toBeVisible()
    await expect(wrapper, 'popover not displayed on page load').toHaveCount(0)

    await button.click()
    await expect(wrapper).toBeVisible()
    await expectSrc(
      wrapper.locator('iframe'),
      'form.typeform.com/to/',
      'typeform-embed=popup-popover&typeform-source=localhost&typeform-medium=demo-test',
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
