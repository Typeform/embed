import { expect, test } from '../support'

type TfWindow = Window & { tf: { load: () => void; reload: () => void } }

test.describe('Reload and reload methods', () => {
  test('window.tf.load() should load the new widgets', async ({ page }) => {
    await page.goto('/widget-html.html')
    const iframes = page.locator('iframe')
    await expect(iframes).toHaveCount(1)
    await expect(iframes.first()).toHaveAttribute('src', /form\.typeform\.com\/to\/HLjqXS5W/)

    await page.evaluate(() => {
      document.body.innerHTML += '<div data-tf-widget="HLjqXS5W"></div>'
      ;(window as unknown as TfWindow).tf.load()
    })

    await expect(iframes).toHaveCount(2)
    await expect(iframes.first()).toHaveAttribute('src', /form\.typeform\.com\/to\/HLjqXS5W/)
    await expect(iframes.nth(1)).toHaveAttribute('src', /form\.typeform\.com\/to\/HLjqXS5W/)
  })

  test('window.tf.reload() should reload the form', async ({ page }) => {
    await page.goto('/widget-html.html')
    const form = page.frameLocator('iframe')

    await expect(form.getByText('How likely are you to recommend us').first()).toBeVisible()
    await form.locator('button[role="radio"][value="10"]').click()
    await expect(form.getByText('Could you tell us why you chose').first()).toBeVisible()

    await page.evaluate(() => (window as unknown as TfWindow).tf.reload())

    await expect(page.frameLocator('iframe').getByText('How likely are you to recommend us').first()).toBeVisible()
  })
})
