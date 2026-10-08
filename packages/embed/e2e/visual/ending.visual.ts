import { test, expect, openWithEmbed } from './support'

test.describe('Embed Screens', () => {
  // The sandbox option avoids recording a real response in the test form.
  test('Widget Thank You Screen', async ({ page, track }) => {
    await openWithEmbed(page, 'createWidget', { enableSandbox: true })
    const form = page.frameLocator('iframe')
    await form.locator('button[role="radio"][value="5"]').click()
    await form.locator('textarea').fill('Visual test')
    await form.getByRole('button', { name: 'Submit' }).click()
    await expect(form.getByText('Thanks for completing')).toBeVisible()
    await track(page, 'Widget Thank You Screen')
  })
})
