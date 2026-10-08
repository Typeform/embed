import { test, openWithEmbed } from './support'

test.describe('Embed Options', () => {
  test('Widget Opacity 0', async ({ page, track }) => {
    await openWithEmbed(page, 'createWidget', { opacity: 0 })
    await track(page, 'Widget Opacity 0')
  })

  test('Widget Opacity 50', async ({ page, track }) => {
    await openWithEmbed(page, 'createWidget', { opacity: 50 })
    await track(page, 'Widget Opacity 50')
  })

  test('Popup Hide Footer', async ({ page, track }) => {
    await openWithEmbed(page, 'createPopup', { hideFooter: true }, { open: true })
    await track(page, 'Popup Hide Footer')
  })
})
