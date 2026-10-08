import { expect, expectSrc, mockForms, test } from '../support'

test('Widget loaded client-side', async ({ page }) => {
  await mockForms(page)
  await page.goto('/client-side.html')
  const widgets = page.locator('.tf-v1-widget iframe')

  await expect(page.locator('#content .tf-v1-widget iframe')).toBeVisible()
  await expectSrc(page.locator('#content .tf-v1-widget iframe'), 'form.typeform.com/to/')
  await expect(page.locator('#more-content .tf-v1-widget'), 'widget added after the lib loaded').toHaveCount(0)
  await expect(widgets).toHaveCount(1)

  await page.locator('button').click() // calls window.tf.load()
  await expect(page.locator('#more-content .tf-v1-widget iframe')).toBeVisible()
  await expectSrc(page.locator('#more-content .tf-v1-widget iframe'), 'form.typeform.com/to/')
  await expect(widgets).toHaveCount(2)
})
