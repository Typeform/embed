import { expect, test } from '../support'

test('Callbacks: should alert onReady when the form loads and onClose when it closes', async ({ page }) => {
  const alerts: string[] = []
  page.on('dialog', (dialog) => {
    alerts.push(dialog.message())
    void dialog.accept()
  })

  await page.goto('/callbacks.html')
  await page.locator('button').click()
  await expect.poll(() => alerts).toContain('onReady')

  await page.locator('button.tf-v1-close').click()
  await expect.poll(() => alerts).toContain('onClose')
})
