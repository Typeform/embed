import { startWidgetOnMobile } from '../support'
import { test, mobileOptions } from './support'

test.describe('Embed Widget', () => {
  test('Basic Embed Widget - Desktop', async ({ page, track }) => {
    await page.goto('/widget-js.html')
    await page.getByTestId('iframe').waitFor()
    await track(page, 'Basic Embed Widget - Desktop')
  })

  test.describe('Mobile', () => {
    test.use(mobileOptions)

    test('Basic Embed Widget - Mobile fullscreen view', async ({ page, track }) => {
      await page.goto('/widget-js.html')
      await startWidgetOnMobile(page)
      await track(page, 'Basic Embed Widget - Mobile fullscreen view')
    })

    test('Basic Embed Widget - Mobile inline view', async ({ page, track }) => {
      await page.goto('/widget-inline.html')
      await page.getByTestId('iframe').waitFor()
      await track(page, 'Basic Embed Widget - Mobile inline view')
    })
  })
})
