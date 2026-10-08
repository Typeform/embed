import { expect, expectSrc, mockForms, test } from '../support'

test('Single embed code (EU region)', async ({ page }) => {
  await mockForms(page)
  await page.route('https://api.typeform.eu/single-embed/01JSXVEN52DVHSX0NDQAJNVAZ4', (route) =>
    route.fulfill({
      json: {
        html: `<div
          id="wrapper"
          data-tf-domain="form.typeform.eu"
          data-tf-widget="Pq5DjtOF"
          data-tf-medium="demo-test"
          data-tf-transitive-search-params="foo,bar"
          data-tf-hidden="foo=foo value"
          data-tf-tracking="utm_source=facebook"
          data-tf-iframe-props="title=Foo Bar"
        ></div>`,
      },
    })
  )

  await page.goto('/live-embed-eu.html?bar=transitive')
  const iframe = page.locator('.tf-v1-widget iframe')

  await expect(iframe).toBeVisible()
  await expectSrc(iframe, 'form.typeform.eu/to/', '#foo=foo+value&email=foo%40bar.com', '&bar=transitive')
})
