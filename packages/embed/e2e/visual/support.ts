import { mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

import type { Frame, Page } from '@playwright/test'
import { PlaywrightVisualRegressionTracker } from '@visual-regression-tracker/agent-playwright'

import { expect, FORM_ID, test as base } from '../support'

export { expect, FORM_ID, mobileOptions } from '../support'

const LOCAL_SCREENSHOTS = join(__dirname, 'local-screenshots')
const FONTS_TIMEOUT = 5000
const IMAGES_TIMEOUT = 5000
const ANIMATIONS_TIMEOUT = 2000
const SETTLE_MS = 500

type Settleable = Pick<Page, 'evaluate'> | Pick<Frame, 'evaluate'>

// Waits until a document is visually stable: fonts loaded, then images loaded, then finite animations
// drained. Infinite ones (spinners, skeletons) are ignored or this would never settle.
const waitForVisualStability = async (target: Settleable) => {
  const evaluate = target.evaluate.bind(target) as <A>(fn: (arg: A) => Promise<void>, arg: A) => Promise<void>

  await evaluate(async (timeout: number) => {
    await Promise.race([
      Promise.all([...document.fonts].map((font) => font.load().catch(() => undefined))).then(
        () => document.fonts.ready
      ),
      new Promise<void>((resolve) => setTimeout(resolve, timeout)),
    ])
  }, FONTS_TIMEOUT)

  await evaluate(async (timeout: number) => {
    await Promise.race([
      Promise.all(
        [...document.images].map((img) =>
          img.complete
            ? undefined
            : new Promise<void>((resolve) => {
                img.addEventListener('load', () => resolve(), { once: true })
                img.addEventListener('error', () => resolve(), { once: true })
              })
        )
      ),
      new Promise<void>((resolve) => setTimeout(resolve, timeout)),
    ])
  }, IMAGES_TIMEOUT)

  await evaluate(async (timeout: number) => {
    const finite = document.getAnimations().filter((a) => a.effect?.getComputedTiming().iterations !== Infinity)
    await Promise.race([
      Promise.all(finite.map((a) => a.finished.catch(() => undefined))),
      new Promise<void>((resolve) => setTimeout(resolve, timeout)),
    ])
  }, ANIMATIONS_TIMEOUT)
}

const formFrames = (page: Page) => page.frames().filter((frame) => frame !== page.mainFrame())

// Waits for every embedded form (and the host page) to settle. `waitForForms: false` is for states without
// a rendered form, such as a closed launcher.
export const waitForEmbedReady = async (page: Page, { waitForForms = true } = {}) => {
  if (waitForForms) {
    await expect
      .poll(
        async () => {
          const frames = formFrames(page)
          const rendered = await Promise.all(
            frames.map((frame) => frame.evaluate(() => document.body?.innerText.trim() !== '').catch(() => false))
          )
          return frames.length > 0 && rendered.every(Boolean)
        },
        { message: 'form iframes rendered content', timeout: 20000 }
      )
      .toBe(true)
    await Promise.all(formFrames(page).map(waitForVisualStability))
  }
  await waitForVisualStability(page)
  await page.waitForTimeout(SETTLE_MS) // animations can start right after the content mounts
}

// Takes screenshots until two consecutive ones are identical, so content that is still moving (a block sliding
// in, a panel opening) never makes it into a baseline. Animations are disabled: finite ones jump to their end
// state and infinite ones (spinners, skeletons) reset to their first frame.
const STABLE_INTERVAL_MS = 250
const STABLE_ATTEMPTS = 20

const takeStableScreenshot = async (page: Page) => {
  let previous = await page.screenshot({ animations: 'disabled' })
  for (let attempt = 0; attempt < STABLE_ATTEMPTS; attempt++) {
    await page.waitForTimeout(STABLE_INTERVAL_MS)
    const current = await page.screenshot({ animations: 'disabled' })
    if (current.equals(previous)) {
      return current
    }
    previous = current
  }
  throw new Error(`The page never became visually stable (${STABLE_ATTEMPTS} attempts, ${STABLE_INTERVAL_MS}ms apart)`)
}

type TrackOptions = {
  // Set to false for states without a rendered form, such as a closed launcher.
  waitForForms?: boolean
  // Percentage of pixels allowed to differ. Only for screenshots with known sub-pixel text noise between runs.
  diffTolerancePercent?: number
}

type Track = (page: Page, name: string, options?: TrackOptions) => Promise<void>

export const test = base.extend<{ track: Track }>({
  track: async ({ browserName }, use) => {
    // Without VRT credentials (local runs) screenshots are saved to disk instead. CI must never skip tracking.
    const local = !process.env.VRT_APIKEY
    if (local && process.env.CI) {
      throw new Error('VRT_APIKEY is not set: refusing to run the visual tests without tracking them')
    }

    const tracker = local ? undefined : new PlaywrightVisualRegressionTracker(browserName)
    await tracker?.start()
    mkdirSync(LOCAL_SCREENSHOTS, { recursive: true })

    await use(async (page, name, { waitForForms = true, diffTolerancePercent } = {}) => {
      await waitForEmbedReady(page, { waitForForms })
      const stableScreenshot = () => takeStableScreenshot(page)

      if (tracker) {
        // No VRT-side retries: they resend the same image, so they can never turn a diff into a pass.
        await tracker.trackPage(
          { viewportSize: () => page.viewportSize(), screenshot: stableScreenshot },
          name,
          { diffTollerancePercent: diffTolerancePercent },
          0
        )
      } else {
        const image = await stableScreenshot()
        writeFileSync(join(LOCAL_SCREENSHOTS, `${name.replace(/[^a-z0-9]+/gi, '-')}.png`), image)
      }
    })

    await tracker?.stop()
  },
})

type EmbedKind = 'createWidget' | 'createPopup'

// Opens a page with a striped background and creates an embed with the given options, to cover options the
// demo pages don't use. None of these options are covered by the renderer's own tests either.
export const openWithEmbed = async (
  page: Page,
  kind: EmbedKind,
  options: Record<string, unknown> = {},
  { open = false, formId = FORM_ID } = {}
) => {
  await page.goto('/visual-options.html')
  await page.evaluate(
    ({ kind, formId, options, open }) => {
      const tf = (window as unknown as { tf: Record<EmbedKind, (id: string, o: object) => { open?: () => void }> }).tf
      const embed = tf[kind](formId, { medium: 'demo-test', container: document.getElementById('wrapper'), ...options })
      if (open) {
        embed.open?.()
      }
    },
    { kind, formId, options, open }
  )
  await page.getByTestId('iframe').waitFor()
}
