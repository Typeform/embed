import { expect, expectSrc, mockForms, test } from '../support'

test('Single embed code', async ({ page }) => {
  await mockForms(page)
  await page.route('https://api.typeform.com/single-embed/01J5X1H8WM5CSXVDN89WXNX5EB', (route) =>
    route.fulfill({
      json: {
        html: `<div
          id="wrapper"
          data-tf-widget="HLjqXS5W"
          data-tf-medium="demo-test"
          data-tf-transitive-search-params="foo,bar"
          data-tf-hidden="foo=foo value"
          data-tf-tracking="utm_source=facebook"
          data-tf-iframe-props="title=Foo Bar"
        ></div>`,
      },
    })
  )

  await page.goto('/live-embed.html?bar=transitive')
  const iframe = page.locator('.tf-v1-widget iframe')

  await expect(iframe).toBeVisible()
  await expectSrc(iframe, 'form.typeform.com/to/', '#foo=foo+value&email=foo%40bar.com', '&bar=transitive')
})
