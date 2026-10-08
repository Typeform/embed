import { expect, expectSrc, mobileOptions, mockForms, startWidgetOnMobile, test } from '../support'

// `widget-newui` points to the same form as `widget`; both are kept to cover both demo pages.
const suites = [
  {
    name: 'Widget',
    pages: [
      ['html', '/widget-html.html'],
      ['javascript', '/widget-js.html'],
      ['server-side rendering', '/'],
    ],
    mobilePages: [
      ['html', '/widget-html.html'],
      ['javascript', '/widget-js.html'],
    ],
  },
  {
    name: 'Widget (new UI)',
    pages: [
      ['html', '/widget-newui-html.html'],
      ['javascript', '/widget-newui-js.html'],
      ['server-side rendering', '/'],
    ],
    mobilePages: [
      ['html', '/widget-newui-html.html'],
      ['javascript', '/widget-newui-js.html'],
    ],
  },
]

for (const { name, pages, mobilePages } of suites) {
  for (const [title, path] of pages) {
    test(`${name} - ${title}`, async ({ page }) => {
      await mockForms(page)
      await page.goto(`${path}?foo=foo&bar=bar&baz=baz`)
      const iframe = page.locator('.tf-v1-widget iframe')

      await expect(iframe).toBeVisible()
      await expectSrc(
        iframe,
        'form.typeform.com/to/',
        'typeform-embed=embed-widget&typeform-source=localhost&typeform-medium=demo-test',
        '#foo=foo+value', // hidden fields
        'bar=bar' // transitive param in the list
      )
      await expect(iframe, 'transitive param not in the list').not.toHaveAttribute('src', /baz=baz/)
      await expect(iframe, 'additional iframe props').toHaveAttribute('title', 'Foo Bar')
    })
  }

  test.describe(`${name} - Mobile`, () => {
    test.use(mobileOptions)

    for (const [title, path] of mobilePages) {
      test(`${name} - ${title}: should reset the form when closing it`, async ({ page }) => {
        await page.goto(`${path}?foo=foo&bar=bar&baz=baz`)
        await startWidgetOnMobile(page)
        await page.locator('.tf-v1-widget-close').click()
        await expect(page.frameLocator('iframe').locator('[data-qa*="ok-button"]').first()).toBeAttached()
      })
    }
  })
}
