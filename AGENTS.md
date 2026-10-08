# Typeform Embed SDK

Monorepo = Typeform public embed SDK. Puts typeform (form at
`https://form.typeform.com/to/<form-id>`) into host page as `<iframe>`, wires to page.
Ships:

- **`@typeform/embed`** ([packages/embed](packages/embed)) — vanilla TypeScript. Published to npm, served as browser bundle at `https://embed.typeform.com/next/embed.js` (exposes `window.tf`).
- **`@typeform/embed-react`** ([packages/embed-react](packages/embed-react)) — React components wrapping vanilla package. Pins exact `@typeform/embed` version.
- `demo-html` and `demo-nextjs` — private demo apps, also used by Playwright suites.

Owned by `@Typeform/blocks`. [docs/](docs/) = source of public docs at
https://www.typeform.com/developers/embed/. Form itself (all inside iframe) lives in separate private repo; SDK owns only host-page side and messages exchanged with form.

## Keeping this doc current

Update this file in same PR when change any of:

- public exports: `packages/embed/src/index.ts`, `packages/embed-react/src/index.tsx`
- option types: `packages/embed/src/base/*.ts`, `packages/embed/src/factories/*/*-options.ts`
- HTML attribute allow-list: `packages/embed/src/initializers/build-options-from-attributes.ts`
- form ↔ SDK message protocol: `packages/embed/src/utils/build-iframe-src.ts`,
  `packages/embed/src/utils/create-iframe/`
- release or CI workflows in `.github/workflows/`

## Using the SDK

### Embed types

| Type                       | JS                                   | HTML                          | React            | CSS (npm)         | Trigger                                               |
| -------------------------- | ------------------------------------ | ----------------------------- | ---------------- | ----------------- | ----------------------------------------------------- |
| widget (inline)            | `createWidget(id, { container, … })` | `<div data-tf-widget="id">`   | `<Widget id>`    | `css/widget.css`  | none: renders at once, or on scroll with `lazy`       |
| popup (centred modal)      | `createPopup(id, opts)`              | `<button data-tf-popup="id">` | `<PopupButton>`  | `css/popup.css`   | JS: none, call `open()`/`toggle()`. HTML: the element |
| slider (side drawer)       | `createSlider(id, opts)`             | `<a data-tf-slider="id">`     | `<SliderButton>` | `css/slider.css`  | same as popup                                         |
| popover (floating bubble)  | `createPopover(id, opts)`            | `<div data-tf-popover="id">`  | `<Popover>`      | `css/popover.css` | SDK renders own button                                |
| sidetab (tab on page edge) | `createSidetab(id, opts)`            | `<div data-tf-sidetab="id">`  | `<Sidetab>`      | `css/sidetab.css` | SDK renders own tab                                   |

Every factory returns `{ unmount, refresh, focus }`; four modal types add `{ open, close, toggle }`.
`id` can be bare form id or full form URL. CSS paths under `@typeform/embed/build/`.

### Three ways to load

```js
// npm, vanilla — the CSS is NOT injected for you
import { createWidget } from '@typeform/embed'
import '@typeform/embed/build/css/widget.css'
createWidget('<form-id>', { container: document.querySelector('#form') })
```

```html
<!-- CDN, no build step — the CSS is linked automatically from embed.typeform.com -->
<div data-tf-widget="<form-id>" data-tf-hidden="utm_source=site" data-tf-on-submit="onFormSubmit"></div>
<script src="//embed.typeform.com/next/embed.js"></script>
```

```jsx
// React — the CSS is inlined in the bundle, nothing to import
import { useCallback } from 'react'
import { PopupButton } from '@typeform/embed-react'

const Contact = () => {
  const onSubmit = useCallback(({ responseId }) => {}, []) // stable identity, see gotchas
  return (
    <PopupButton id="<form-id>" onSubmit={onSubmit}>
      Open
    </PopupButton>
  )
}
```

### Options

Full reference: [docs/configuration.md](docs/configuration.md). TypeScript types = source of
truth: `packages/embed/src/base/url-options.ts`, `behavioral-options.ts`, `iframe-options.ts` and
`packages/embed/src/factories/*/*-options.ts`. Most important:

- **Data in:** `hidden` (hidden fields declared in form; sent in URL hash), `tracking` (query string; can override SDK params), `transitiveSearchParams` (copy host-page query params; `true` = all), `preselect` (first key only), `hubspot`.
- **Where form lives:** `domain` (bare hostname, default `form.typeform.com`), `region: 'eu'`, `source` / `medium` / `mediumVersion` (attribution for integrators and plugins).
- **Look:** `hideHeaders`, `hideFooter`, `opacity` (0–100), `width` / `height` (number = px), `size` (popup, %), `position` (slider), `buttonColor` / `buttonText` / `customIcon` / `tooltip` / `notificationDays` (popover, sidetab), `buttonProps`, `iframeProps`.
- **Widget behaviour:** `autoResize` (`true` or `'min,max'`), `lazy`, `autoFocus`, `inlineOnMobile`, `fullScreen`, `noScrollbars`, `disableScroll`.
- **Modal behaviour:** `open` + `openValue` (`load`, `time` ms, `scroll` %, `exit` px), `autoClose`, `keepSession`, `preventReopenOnClose`, `respectOpenModals`.
- **Modes:** `enableSandbox` (Typeform test mode: no response stored, `responseId` is `'__sandbox'`; not iframe sandbox), `disableTracking`, `shareGaInstance`, `redirectTarget`.

### Callbacks

| Callback              | Fires when                                                          | Payload                           |
| --------------------- | ------------------------------------------------------------------- | --------------------------------- |
| `onReady`             | form loaded                                                         | `{ formId, isClosed, formTitle }` |
| `onStarted`           | respondent started answering                                        | `{ formId, responseId }`          |
| `onQuestionChanged`   | visible screen changed                                              | `{ formId, ref }`                 |
| `onHeightChanged`     | form content height changed                                         | `{ formId, ref, height }`         |
| `onSubmit`            | response submitted                                                  | `{ formId, responseId }`          |
| `onEndingButtonClick` | ending button clicked; registering it disables its redirect         | `{ formId, ref? }`                |
| `onDuplicateDetected` | form refused duplicate response                                     | `{ formId }`                      |
| `onClose`             | modal closed (user, `close()`, Escape)                              | none                              |

Modal embeds attach iframe on first `open()`, so `onReady` fires then, not at creation.
Messages matched by type and embed id only; no `event.origin` check. Treat callback data as UI hint, verify responses server-side (Responses API or webhooks).

### HTML attribute rules (`data-tf-*`)

- Name = `data-tf-` + option in kebab-case (`autoResize` → `data-tf-auto-resize`). Allow-list and parsers in `packages/embed/src/initializers/build-options-from-attributes.ts`.
- Booleans: present with `""`, `true` or `yes` → true; any other value, **including `"false"`**, → false. Omit attribute to leave option unset.
- Objects = `k=v,k2=v2` (not JSON), arrays = `a,b,c`; escape comma as `\,`.
- Callbacks = name of function on `window`. Top-level `const`/`let` functions not on `window`, fail silently.
- `container` and `region` can't be set from HTML; use `data-tf-domain="form.typeform.eu"`.
- Elements added after load: `window.tf.load()` initialises new ones, `window.tf.reload()` re-initialises all. `data-tf-live="<embed-id>"` fetches snippet from `api.typeform.com/single-embed/<embed-id>`.

### Things AI commonly gets wrong (consumers)

- **`embed.typeform.com/embed.js` (no `/next`) = legacy v0 library** (`typeformEmbed.makeWidget`), not compatible with this one. Use `/next/embed.js` and `window.tf.create*`.
- **npm vanilla package loads no CSS.** Import `@typeform/embed/build/css/<type>.css`. HTML API always links CSS from `embed.typeform.com/next/css/` (baked in at build time, even on bundle pinned via unpkg). React inlines it as `<style>`, with nonce from `__webpack_nonce__`.
- **npm build is UMD/CJS only** (`main` only; no `exports` or `module` field). Vite and SvelteKit users may need `import * as embed from '@typeform/embed'`.
- **Next.js App Router:** React package has no `'use client'`; use from Client Component. `createPopover` and `createSidetab` throw on server; other factories no-op without DOM.
- **React re-creates embed when callback identity changes.** Components memoised with deep equality, but functions compare by reference, so inline callbacks rebuild iframe on every parent render and respondent loses progress. Wrap in `useCallback`. Ref prop is `embedRef` (not `ref`); `Widget` has none.
- **React 19 types:** published `embed-react` typings import `ReactHTML`, removed by `@types/react` 19, so type-check fails (`TS2305`) though runtime works. CI tests React 18 only.
- **`createPopup` and `createSlider` render no button.** Call `open()` / `toggle()`, or use `open: 'load' | 'time' | 'scroll' | 'exit'`.
- **`hidden` ≠ `tracking`.** Hidden fields must exist in form and travel in URL hash; `tracking` goes in query string.
- **`domain` = bare host** (`form.typeform.eu`), not URL.
- **EU accounts: forms live on `form.typeform.eu`.** Plain embed points at `form.typeform.com`, which doesn't serve EU forms (returns Typeform's generic landing page). Use `region: 'eu'` (JS, React) or `data-tf-domain="form.typeform.eu"` (HTML); custom `domain` wins over `region`. For `data-tf-live`, add `data-tf-region="eu"` on same element so snippet fetched from `api.typeform.eu`. `region` row in `docs/configuration.md` still says not available to customers yet; SDK supports it.
- **`enableSandbox` = Typeform test mode**, not iframe `sandbox`. Iframe has no `sandbox` attribute, no default `title` (pass `iframeProps: { title }`) and `allow="microphone; camera"` only; `iframeProps.allow` replaces list, not extends.
- **Mobile widgets go fullscreen.** On phone widget shows placeholder welcome screen, then opens as fullscreen modal unless `inlineOnMobile` or `fullScreen` set. Check is user-agent based.
- **Redirects:** default `redirectTarget` is `_parent` (navigates host page). `_self` keeps redirect inside iframe (needed to chain typeforms); `_blank` blocked by Safari and Chrome Android; `_self` + `autoClose` closes modal before redirect seen.
- **`onClose` has no payload.** Code destructuring `({ formId })` from it throws.
- **Escape closes modal only while focus on host page.** Form never posts `form-close`, so Escape pressed inside iframe does nothing.
- **`unmount()` removes DOM but not `window` `message` listeners.** Creating embeds in loop (e.g. every render) leaks listeners.
- **CSP:** allow `frame-src` for `form.typeform.com` / `form.typeform.eu` (or your `domain`). HTML mode also needs `script-src` and `style-src` for `embed.typeform.com`; `data-tf-live` needs `connect-src` for `api.typeform.com` (`api.typeform.eu` for EU). Forms can only be framed from `https:`, `localhost`, `capacitor:` and `ionic:`.
- **`buttonText`, `tooltip` and `customIcon` written with `innerHTML`.** Never pass untrusted input.

## How it works

1. `buildIframeSrc` (`packages/embed/src/utils/build-iframe-src.ts`) builds
   `https://<domain>/to/<id>?typeform-embed=<type>&typeform-embed-id=<random>&typeform-source=…&typeform-medium=embed-sdk&…`,
   adds option flags (`embed-hide-footer`, `typeform-embed-auto-resize`, …), then transitive params, then `tracking`. `hidden` and `preselect` go in hash. `typeform-embed` values: `embed-widget`, `popup-blank`, `popup-drawer`, `popup-popover`, `popup-side-panel`.
2. `createIframe` (`packages/embed/src/utils/create-iframe/`) creates iframe, registers one `window` `message` listener per form event: `form-ready`, `form-started`, `form-screen-changed`, `form-height-changed`, `form-submit`, `form-theme`, `thank-you-screen-button-click`, `redirect-after-submit` / `thank-you-screen-redirect`, `duplicate-detected`, `welcome-screen-hidden`, `form-close`. Every message carries `embedId`. Outbound: `embed-focus` and `ga-client-id`.
3. Host-page chrome (overlay, close button, popover bubble, sidetab) = plain DOM built in `packages/embed/src/factories/*`, styled by `packages/embed/src/css/*.scss` (class prefix `tf-v1-`, z-index 10001, popups go full-size under 480px).
4. `packages/embed/src/initializers/` scans `[data-tf-*]` elements, parses attributes into options, calls factories; `packages/embed/src/browser.ts` = CDN entry running this on load.
5. `packages/embed-react` wraps each factory in component that calls it from `useEffect`, unmounts on cleanup. Its `src/css` is symlink to embed's build output.

## Contributing

Layout: `packages/embed/src/{base,factories,initializers,live-embed,utils,css}`, `packages/embed/e2e/{functional,visual}`
(Playwright, config in `packages/embed/playwright.config.ts`), `packages/embed-react/src/{components,utils}`, `docs/` (public docs),
`scripts/release.sh`, `.github/workflows/`.

Node 24 in CI (`engines` still says ≥ 18), Yarn 1, Lerna 3 as task runner only.

```bash
yarn install                 # runs lerna bootstrap
yarn build                   # embed, then embed-react, then the Next.js demo; build embed before embed-react
yarn lint && yarn test       # eslint --max-warnings=0 + prettier (incl. docs/), jest (~300 tests, ~10 s each)
cd packages/embed && yarn demo       # watch build + demo-nextjs on :9090
cd packages/embed && yarn preview    # serve build/embed.js on :9022 with a matching CSS URL
yarn playwright install chromium     # once: the e2e tests use Playwright's pinned Chromium
yarn test:functional         # Playwright; mostly a blank page instead of the form, only form-interacting tests need network
yarn test:visual             # Playwright + VRT; without VRT_APIKEY it saves screenshots to e2e/visual/local-screenshots
yarn test:e2e:open           # Playwright UI; CI runs the visual job only on PRs from this repo, not forks
```

Conventions: conventional commits enforced by commitlint with Jira scope,
`fix(TU-1234): Sentence case subject` (`NOJIRA-123` for untracked work). Husky 4 (`.huskyrc`) builds and lints on commit, runs tests on push. Prettier: no semicolons, single quotes, 120 columns.

Release: push to `main` runs `scripts/release.sh` via `release.yml`: semantic-release for `@typeform/embed` (npm with provenance, plus GitHub Packages), then automatic `feat:` bump of embed-react's dependency (so every embed release also cuts embed-react minor), then embed-react. `feat` → minor, `fix`/`perf`/`chore(deps)` → patch, `BREAKING CHANGE:` footer → major; PRs squash-merged, so squashed commit message is what semantic-release reads. Typeform tooling also expects branches named
`type/TU-1234_snake_case` and lowercase PR titles, `fix(TU-1234): lowercase subject`. `@typeform/embed-v*` release triggers `deploy-aws.yml`, uploads `embed.js` and CSS to `embed.typeform.com/next/` with internal `jarvis` tool. Pushes to `main` also dispatch `Typeform/developers` (docs) and `Typeform/embed-demo`. Internal-only: AWS and preview deploys, VRT server (tracking runs, approving baselines), `ci-standard-checks`.
`packages/*/CHANGELOG.md` are generated.

### Things AI commonly gets wrong (contributors)

- **Option touches four places:** option type, `build-options-from-attributes.ts` (HTML allow-list and parser), `build-iframe-src.ts` (query param) and `docs/configuration.md`. React picks type up automatically. Add spec next to each file.
- **`typeform-embed*` query params and message types = contract with form renderer.** Adding or renaming one needs renderer change first; SDK can't add behaviour form doesn't support. Checked against renderer's `apps/louvre/src/client/embed-settings.js` on 2026-10-08: maps only `embed-widget`, `embed-fullpage`, `popup-classic`, `popup-drawer` and `popup-blank` to embed mode, so `popup-popover` and `popup-side-panel` get none; absent `embed-opacity` means opaque (100); `embed-hide-footer` hides arrows and progress but not OK button or "Powered by Typeform".
- **`yarn build` without `NODE_ENV=production` = dev build** with `CSS_URL=./lib/css/` and eval source maps. Never publish or compare bundle sizes from it.
- **Don't edit** `packages/*/CHANGELOG.md`, `packages/demo-nextjs/public` (symlink to demo-html) or `packages/embed-react/src/css` (symlink to embed's build).
- **Visual tests load live hosted form `HLjqXS5W`** (19 tests, `packages/embed/e2e/visual`); renderer change can break baselines without SDK change. Baselines live on VRT server, not repo, new ones need approving there (new browser or test name shows as `No baseline`). Run on Playwright's pinned Chromium, so baselines also change when Playwright bumped. Only two sidetab tests set `diffTolerancePercent` (1%) because text anti-aliasing varies between runs; keep every other screenshot at 0%.
- **Functional tests serve blank page for form** (`mockForms` in `packages/embed/e2e/support.ts`) when only asserting iframe attributes. Test needing `form-ready`, form's keyboard focus or its content must use real form.
- **`ci-standard-checks` rejects any PR touching `tsconfig.json`** without `allowUnreachableCode: false` and `noImplicitAny: true`, even in `e2e/tsconfig.json`.
- **`docs/` published verbatim** to developer portal; keep front matter (`nav_title`, `nav_order`), run `yarn docs-prettier`.

## Where to look

- Public docs source: [docs/](docs/) — `configuration.md`, `callbacks.md`, `hidden-fields.md`, `inline.md`, `modal.md`, `react.md`, `vanilla.md`, `mobile-apps.md`, `custom-embed.md`
- Option types: `packages/embed/src/base/`, `packages/embed/src/factories/*/*-options.ts`
- URL and message protocol: `packages/embed/src/utils/build-iframe-src.ts`,
  `packages/embed/src/utils/create-iframe/`
- HTML API: `packages/embed/src/initializers/`, `packages/embed/src/utils/load-options-from-attributes.ts`,
  `packages/embed/src/browser.ts`
- React wrappers: `packages/embed-react/src/components/`
- Live, editable examples: https://github.com/Typeform/embed-demo
- Bugs and feature requests: https://github.com/Typeform/embed/issues. Form-side problems (what renders inside iframe) go to Typeform support, not this repo.