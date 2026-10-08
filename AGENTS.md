# Typeform Embed SDK

This monorepo is Typeform's public embed SDK. It puts a typeform (a form served at
`https://form.typeform.com/to/<form-id>`) into a host page as an `<iframe>` and wires it to the page.
It ships:

- **`@typeform/embed`** ([packages/embed](packages/embed)) — vanilla TypeScript. Published to npm, and
  served as a browser bundle at `https://embed.typeform.com/next/embed.js` (exposes `window.tf`).
- **`@typeform/embed-react`** ([packages/embed-react](packages/embed-react)) — React components wrapping
  the vanilla package. It pins the exact `@typeform/embed` version.
- `demo-html` and `demo-nextjs` — private demo apps, also used by the Playwright suites.

Owned by `@Typeform/blocks`. [docs/](docs/) is the source of the public documentation at
https://www.typeform.com/developers/embed/. The form itself (everything inside the iframe) lives in a
separate, private repo; this SDK only owns the host-page side and the messages exchanged with the form.

## Keeping this doc current

Update this file in the same PR when you change any of:

- public exports: `packages/embed/src/index.ts`, `packages/embed-react/src/index.tsx`
- option types: `packages/embed/src/base/*.ts`, `packages/embed/src/factories/*/*-options.ts`
- the HTML attribute allow-list: `packages/embed/src/initializers/build-options-from-attributes.ts`
- the form ↔ SDK message protocol: `packages/embed/src/utils/build-iframe-src.ts`,
  `packages/embed/src/utils/create-iframe/`
- the release or CI workflows in `.github/workflows/`

## Using the SDK

### Embed types

| Type                       | JS                                   | HTML                          | React            | CSS (npm)         | Trigger                                               |
| -------------------------- | ------------------------------------ | ----------------------------- | ---------------- | ----------------- | ----------------------------------------------------- |
| widget (inline)            | `createWidget(id, { container, … })` | `<div data-tf-widget="id">`   | `<Widget id>`    | `css/widget.css`  | none: renders at once, or on scroll with `lazy`       |
| popup (centred modal)      | `createPopup(id, opts)`              | `<button data-tf-popup="id">` | `<PopupButton>`  | `css/popup.css`   | JS: none, call `open()`/`toggle()`. HTML: the element |
| slider (side drawer)       | `createSlider(id, opts)`             | `<a data-tf-slider="id">`     | `<SliderButton>` | `css/slider.css`  | same as popup                                         |
| popover (floating bubble)  | `createPopover(id, opts)`            | `<div data-tf-popover="id">`  | `<Popover>`      | `css/popover.css` | the SDK renders its own button                        |
| sidetab (tab on page edge) | `createSidetab(id, opts)`            | `<div data-tf-sidetab="id">`  | `<Sidetab>`      | `css/sidetab.css` | the SDK renders its own tab                           |

Every factory returns `{ unmount, refresh, focus }`; the four modal types add `{ open, close, toggle }`.
`id` can be a bare form id or a full form URL. CSS paths are under `@typeform/embed/build/`.

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

Full reference: [docs/configuration.md](docs/configuration.md). The TypeScript types are the source of
truth: `packages/embed/src/base/url-options.ts`, `behavioral-options.ts`, `iframe-options.ts` and
`packages/embed/src/factories/*/*-options.ts`. The ones that matter most:

- **Data in:** `hidden` (hidden fields declared in the form; sent in the URL hash), `tracking` (query
  string; can override SDK params), `transitiveSearchParams` (copy host-page query params; `true` = all),
  `preselect` (first key only), `hubspot`.
- **Where the form lives:** `domain` (bare hostname, default `form.typeform.com`), `region: 'eu'`,
  `source` / `medium` / `mediumVersion` (attribution for integrators and plugins).
- **Look:** `hideHeaders`, `hideFooter`, `opacity` (0–100), `width` / `height` (number = px), `size`
  (popup, %), `position` (slider), `buttonColor` / `buttonText` / `customIcon` / `tooltip` /
  `notificationDays` (popover, sidetab), `buttonProps`, `iframeProps`.
- **Widget behaviour:** `autoResize` (`true` or `'min,max'`), `lazy`, `autoFocus`, `inlineOnMobile`,
  `fullScreen`, `noScrollbars`, `disableScroll`.
- **Modal behaviour:** `open` + `openValue` (`load`, `time` ms, `scroll` %, `exit` px), `autoClose`,
  `keepSession`, `preventReopenOnClose`, `respectOpenModals`.
- **Modes:** `enableSandbox` (Typeform test mode: no response is stored and `responseId` is
  `'__sandbox'`; it is not an iframe sandbox), `disableTracking`, `shareGaInstance`, `redirectTarget`.

### Callbacks

| Callback              | Fires when                                                          | Payload                           |
| --------------------- | ------------------------------------------------------------------- | --------------------------------- |
| `onReady`             | the form has loaded                                                 | `{ formId, isClosed, formTitle }` |
| `onStarted`           | the respondent started answering                                    | `{ formId, responseId }`          |
| `onQuestionChanged`   | the visible screen changed                                          | `{ formId, ref }`                 |
| `onHeightChanged`     | the form content height changed                                     | `{ formId, ref, height }`         |
| `onSubmit`            | a response was submitted                                            | `{ formId, responseId }`          |
| `onEndingButtonClick` | the ending button was clicked; registering it disables its redirect | `{ formId, ref? }`                |
| `onDuplicateDetected` | the form refused a duplicate response                               | `{ formId }`                      |
| `onClose`             | a modal was closed (user, `close()`, Escape)                        | none                              |

Modal embeds attach the iframe on the first `open()`, so `onReady` fires then, not at creation.
Messages are matched by type and embed id only; there is no `event.origin` check. Treat callback
data as a UI hint and verify responses server-side (Responses API or webhooks).

### HTML attribute rules (`data-tf-*`)

- Name = `data-tf-` + the option in kebab-case (`autoResize` → `data-tf-auto-resize`). The allow-list
  and parsers live in `packages/embed/src/initializers/build-options-from-attributes.ts`.
- Booleans: present with `""`, `true` or `yes` → true; any other value, **including `"false"`**, → false.
  Omit the attribute to leave an option unset.
- Objects are `k=v,k2=v2` (not JSON), arrays are `a,b,c`; escape a comma as `\,`.
- Callbacks are the name of a function on `window`. Top-level `const`/`let` functions are not on
  `window` and fail silently.
- `container` and `region` can't be set from HTML; use `data-tf-domain="form.typeform.eu"`.
- Elements added after load: `window.tf.load()` initialises new ones, `window.tf.reload()` re-initialises
  all. `data-tf-live="<embed-id>"` fetches a snippet from `api.typeform.com/single-embed/<embed-id>`.

### Things AI commonly gets wrong (consumers)

- **`embed.typeform.com/embed.js` (no `/next`) is the legacy v0 library** (`typeformEmbed.makeWidget`),
  which is not compatible with this one. Use `/next/embed.js` and `window.tf.create*`.
- **The npm vanilla package loads no CSS.** Import `@typeform/embed/build/css/<type>.css`. The HTML API
  always links the CSS from `embed.typeform.com/next/css/` (baked in at build time, even on a bundle
  pinned via unpkg). React inlines it as a `<style>`, with a nonce from `__webpack_nonce__`.
- **The npm build is UMD/CJS only** (`main` only; no `exports` or `module` field). Vite and SvelteKit
  users may need `import * as embed from '@typeform/embed'`.
- **Next.js App Router:** the React package has no `'use client'`; use it from a Client Component.
  `createPopover` and `createSidetab` throw on the server; the other factories no-op without a DOM.
- **React re-creates the embed when a callback's identity changes.** Components are memoised with deep
  equality, but functions compare by reference, so inline callbacks rebuild the iframe on every parent
  render and the respondent loses progress. Wrap them in `useCallback`. The ref prop is `embedRef`
  (not `ref`); `Widget` has none.
- **React 19 types:** the published `embed-react` typings import `ReactHTML`, which `@types/react` 19
  removed, so type-checking fails (`TS2305`) even though the runtime works. CI tests React 18 only.
- **`createPopup` and `createSlider` render no button.** Call `open()` / `toggle()`, or use
  `open: 'load' | 'time' | 'scroll' | 'exit'`.
- **`hidden` ≠ `tracking`.** Hidden fields must exist in the form and travel in the URL hash; `tracking`
  goes in the query string.
- **`domain` is a bare host** (`form.typeform.eu`), not a URL.
- **EU accounts: forms live on `form.typeform.eu`.** A plain embed points at `form.typeform.com`, which
  does not serve EU forms (it returns Typeform's generic landing page). Use `region: 'eu'` (JS, React) or `data-tf-domain="form.typeform.eu"` (HTML); a custom
  `domain` wins over `region`. For `data-tf-live`, add `data-tf-region="eu"` on the same element so the
  snippet is fetched from `api.typeform.eu`. The `region` row in `docs/configuration.md` still says it is
  not available to customers yet; the SDK supports it.
- **`enableSandbox` is Typeform's test mode**, not an iframe `sandbox`. The iframe has no `sandbox`
  attribute, no default `title` (pass `iframeProps: { title }`) and `allow="microphone; camera"` only;
  `iframeProps.allow` replaces that list rather than extending it.
- **Mobile widgets go fullscreen.** On a phone a widget shows a placeholder welcome screen and then opens
  as a fullscreen modal unless `inlineOnMobile` or `fullScreen` is set. The check is user-agent based.
- **Redirects:** the default `redirectTarget` is `_parent` (navigates the host page). `_self` keeps the
  redirect inside the iframe (needed to chain typeforms); `_blank` is blocked by Safari and Chrome
  Android; `_self` + `autoClose` closes the modal before the redirect is seen.
- **`onClose` has no payload.** Code that destructures `({ formId })` from it throws.
- **Escape closes a modal only while focus is on the host page.** The form never posts `form-close`,
  so Escape pressed inside the iframe does nothing.
- **`unmount()` removes the DOM but not the `window` `message` listeners.** Creating embeds in a loop
  (for example on every render) leaks listeners.
- **CSP:** allow `frame-src` for `form.typeform.com` / `form.typeform.eu` (or your `domain`). HTML mode
  also needs `script-src` and `style-src` for `embed.typeform.com`; `data-tf-live` needs `connect-src`
  for `api.typeform.com` (`api.typeform.eu` for EU). Forms can only be framed from `https:`, `localhost`, `capacitor:` and `ionic:`.
- **`buttonText`, `tooltip` and `customIcon` are written with `innerHTML`.** Never pass untrusted input.

## How it works

1. `buildIframeSrc` (`packages/embed/src/utils/build-iframe-src.ts`) builds
   `https://<domain>/to/<id>?typeform-embed=<type>&typeform-embed-id=<random>&typeform-source=…&typeform-medium=embed-sdk&…`,
   adds the option flags (`embed-hide-footer`, `typeform-embed-auto-resize`, …), then the transitive
   params, then `tracking`. `hidden` and `preselect` go in the hash. `typeform-embed` values are
   `embed-widget`, `popup-blank`, `popup-drawer`, `popup-popover`, `popup-side-panel`.
2. `createIframe` (`packages/embed/src/utils/create-iframe/`) creates the iframe and registers one
   `window` `message` listener per form event: `form-ready`, `form-started`, `form-screen-changed`,
   `form-height-changed`, `form-submit`, `form-theme`, `thank-you-screen-button-click`,
   `redirect-after-submit` / `thank-you-screen-redirect`, `duplicate-detected`, `welcome-screen-hidden`,
   `form-close`. Every message carries `embedId`. Outbound: `embed-focus` and `ga-client-id`.
3. The host-page chrome (overlay, close button, popover bubble, sidetab) is plain DOM built in
   `packages/embed/src/factories/*` and styled by `packages/embed/src/css/*.scss` (class prefix `tf-v1-`,
   z-index 10001, popups go full-size under 480px).
4. `packages/embed/src/initializers/` scans `[data-tf-*]` elements, parses attributes into options and
   calls the factories; `packages/embed/src/browser.ts` is the CDN entry that runs this on load.
5. `packages/embed-react` wraps each factory in a component that calls it from `useEffect` and unmounts
   on cleanup. Its `src/css` is a symlink to embed's build output.

## Contributing

Layout: `packages/embed/src/{base,factories,initializers,live-embed,utils,css}`, `packages/embed/e2e/{functional,visual}`
(Playwright, config in `packages/embed/playwright.config.ts`), `packages/embed-react/src/{components,utils}`, `docs/` (public docs),
`scripts/release.sh`, `.github/workflows/`.

Node 24 in CI (`engines` still says ≥ 18), Yarn 1, Lerna 3 as a task runner only.

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

Conventions: conventional commits enforced by commitlint with a Jira scope,
`fix(TU-1234): Sentence case subject` (`NOJIRA-123` for untracked work). Husky 4 (`.huskyrc`) builds and
lints on commit and runs tests on push. Prettier: no semicolons, single quotes, 120 columns.

Release: a push to `main` runs `scripts/release.sh` via `release.yml`: semantic-release for
`@typeform/embed` (npm with provenance, plus GitHub Packages), then an automatic `feat:` bump of
embed-react's dependency (so every embed release also cuts an embed-react minor), then embed-react.
`feat` → minor, `fix`/`perf`/`chore(deps)` → patch, a `BREAKING CHANGE:` footer → major; PRs are
squash-merged, so the squashed commit message is what semantic-release reads. Typeform's tooling also expects branches named
`type/TU-1234_snake_case` and lowercase PR titles, `fix(TU-1234): lowercase subject`. An `@typeform/embed-v*`
release triggers `deploy-aws.yml`, which uploads `embed.js` and the CSS to `embed.typeform.com/next/`
with the internal `jarvis` tool. Pushes to `main` also dispatch `Typeform/developers` (docs) and
`Typeform/embed-demo`. Internal-only: AWS and preview deploys, the VRT server (tracking runs and approving baselines), `ci-standard-checks`.
`packages/*/CHANGELOG.md` are generated.

### Things AI commonly gets wrong (contributors)

- **An option touches four places:** the option type, `build-options-from-attributes.ts` (HTML allow-list
  and parser), `build-iframe-src.ts` (query param) and `docs/configuration.md`. React picks the type up
  automatically. Add a spec next to each file.
- **The `typeform-embed*` query params and the message types are a contract with the form renderer.**
  Adding or renaming one needs a renderer change first; the SDK can't add behaviour the form doesn't
  support. Checked against the renderer's `apps/louvre/src/client/embed-settings.js` on 2026-10-08: it
  maps only `embed-widget`, `embed-fullpage`, `popup-classic`, `popup-drawer` and `popup-blank` to an embed
  mode, so `popup-popover` and `popup-side-panel` get none; an absent `embed-opacity` means opaque (100);
  `embed-hide-footer` hides the arrows and progress but not the OK button or "Powered by Typeform".
- **`yarn build` without `NODE_ENV=production` is a dev build** with `CSS_URL=./lib/css/` and eval source
  maps. Never publish or compare bundle sizes from it.
- **Don't edit** `packages/*/CHANGELOG.md`, `packages/demo-nextjs/public` (symlink to demo-html) or
  `packages/embed-react/src/css` (symlink to embed's build).
- **Visual tests load the live hosted form `HLjqXS5W`** (19 tests, `packages/embed/e2e/visual`); a renderer
  change can break the baselines without any SDK change. Baselines live on the VRT server, not in the repo,
  and new ones need approving there (a new browser or test name shows up as `No baseline`). They run on
  Playwright's pinned Chromium, so baselines also change when Playwright is bumped. Only the two sidetab
  tests set `diffTolerancePercent` (1%) because their text anti-aliasing varies between runs; keep every
  other screenshot at 0%.
- **Functional tests serve a blank page for the form** (`mockForms` in `packages/embed/e2e/support.ts`) when
  they only assert iframe attributes. A test that needs `form-ready`, the form's keyboard focus or its
  content must use the real form instead.
- **`ci-standard-checks` rejects any PR that touches a `tsconfig.json`** without `allowUnreachableCode: false`
  and `noImplicitAny: true`, even in `e2e/tsconfig.json`.
- **`docs/` is published verbatim** to the developer portal; keep the front matter (`nav_title`,
  `nav_order`) and run `yarn docs-prettier`.

## Where to look

- Public docs source: [docs/](docs/) — `configuration.md`, `callbacks.md`, `hidden-fields.md`,
  `inline.md`, `modal.md`, `react.md`, `vanilla.md`, `mobile-apps.md`, `custom-embed.md`
- Option types: `packages/embed/src/base/`, `packages/embed/src/factories/*/*-options.ts`
- URL and message protocol: `packages/embed/src/utils/build-iframe-src.ts`,
  `packages/embed/src/utils/create-iframe/`
- HTML API: `packages/embed/src/initializers/`, `packages/embed/src/utils/load-options-from-attributes.ts`,
  `packages/embed/src/browser.ts`
- React wrappers: `packages/embed-react/src/components/`
- Live, editable examples: https://github.com/Typeform/embed-demo
- Bugs and feature requests: https://github.com/Typeform/embed/issues. Form-side problems (what renders
  inside the iframe) go to Typeform support, not this repo.
