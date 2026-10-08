import { desktopViewport, expect, mockForms, test } from '../support'

const pages = [
  ['-html', 'embed code'],
  ['-js', 'API'],
]

const url = (name: string, suffix: string, query = '') => `/behavioral${suffix}/${name}${suffix}.html?${query}`

test.use({ viewport: desktopViewport })

for (const [suffix, via] of pages) {
  test.describe(`Behavioral embeds using ${via}`, () => {
    test.beforeEach(({ page }) => mockForms(page))

    test('Open: exit', async ({ page }) => {
      await page.goto(url('exit', suffix, 'threshold=100'))
      const iframe = page.locator('iframe')
      const moveTo = async (...ys: number[]) => {
        for (const y of ys) {
          await page.mouse.move(400, y)
        }
      }

      await moveTo(200, 300, 350) // downwards in the area
      await expect(iframe).toHaveCount(0)
      await moveTo(120, 200) // outside the area
      await expect(iframe).toHaveCount(0)
      await moveTo(90, 80, 70) // upwards in the area
      await expect(iframe).toBeVisible()
    })

    test('Open: load', async ({ page }) => {
      await page.goto(url('load', suffix))
      await expect(page.locator('iframe')).toBeVisible()
    })

    test('Open: scroll', async ({ page }) => {
      await page.goto(url('scroll', suffix, 'percent=30'))
      await expect(page.locator('iframe')).toHaveCount(0)

      await page.evaluate(() => window.scrollTo(0, 950)) // 950px is over 30% of the page height
      await expect(page.locator('iframe')).toBeVisible()

      await page.reload() // opens immediately when reloading on the same position
      await expect(page.locator('iframe')).toBeVisible()
    })

    test('Open: time', async ({ page }) => {
      await page.goto(url('time', suffix, 'ms=1000')) // opens after 1 second
      await expect(page.locator('iframe')).toHaveCount(0)
      await expect(page.locator('iframe')).toBeVisible({ timeout: 5000 })
    })
  })
}

test('Open: load (via embed code) should display the close button and close the popup', async ({ page }) => {
  await mockForms(page)
  await page.goto(url('load', '-html'))
  await expect(page.locator('.tf-v1-close')).toBeVisible()

  await page.locator('.tf-v1-close').click()
  await expect(page.locator('iframe')).toHaveCount(0)
})
