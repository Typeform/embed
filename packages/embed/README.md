# 🛠 Typeform Vanilla Embed Library

**Typeform/embed** is the core embed library that lets you embed typeforms to your website using vanilla JavaScript.

## Installation

### As NPM package

Requirements:

- node >= 14 (for node v12 use [v1.38.0](https://www.npmjs.com/package/@typeform/embed/v/1.38.0))
- yarn or npm

Install using your favourite package manager:

```shell
yarn add @typeform/embed
```

or

```shell
npm install --save @typeform/embed
```

Import the lib, CSS and create your embed:

```javascript
import { createWidget } from '@typeform/embed'
import '@typeform/embed/build/css/widget.css'
createWidget('<form-id>', { container: document.querySelector('#form') })
```

### From CDN

As HTML, the CSS is imported automatically. Place this code where you want to display your form.

```html
<div data-tf-widget="<form-id>"></div>
<script src="//embed.typeform.com/next/embed.js"></script>
```

Via JavaScript for more control and specific integration.

```html
<button id="button">open form</button>
<script src="//embed.typeform.com/next/embed.js"></script>
<link rel="stylesheet" href="//embed.typeform.com/next/css/popup.css" />
<script>
  const { open, close, toggle, refresh } = window.tf.createPopup('<form-id>')
  document.querySelector('#button').onclick = toggle
</script>
```

### How to get form id of your form?

You can find `<form-id>` from the public URL of your form:

- `https://form.typeform.com/to/<form-id>`

Or from admin panel URL:

- `https://admin.typeform.com/form/<form-id>/*`

### Limitations

For security purposes we prevent embedding typeorms in unsecure pages (via [CSP headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)).
You can embed your typeform on pages served over HTTPS or via HTTP on localhost. You can also [embed in wrapped progressive web apps](https://developer.typeform.com/embed/mobile-apps/).

## Configuration

### Embed types

#### Widget

```html
<div id="form"></div>
<script>
  const { refresh, unmount } = createWidget('<form-id>', {
    container: document.querySelector('#form'),
    ...options,
  })
</script>
```

The `createWidget` method returns 2 functions:

- **refresh** - reloads the form
- **unmount** - unmounts the form (you should use this when you implement this lib in React manually)

#### Modal windows: popup, slider, sidetab, popover

- popup: `createPopup('<form-id>', options)`
- slider: `createSlider('<form-id>', options)`
- sidetab: `createSidetab('<form-id>', options)`
- popover: `createPopover('<form-id>', options)`

```html
<button id="button">open form</button>
<script>
  const { open, close, toggle, refresh } = createPopup('<form-id>')
  document.querySelector('#button').onclick = toggle
</script>
```

Each of the `create*` methods for modal windows return 4 functions:

- **open** - open the modal window (popup, slider, sidetab or popover) and display the form
- **close** - close the modal window and hide the form
- **toggle** - open when closed, close when opened
- **refresh** - reloads the form
- **unmount** - unmounts the form (you should use this when you implement this lib in React manually)

Closing and opening a typeform in modal window will restart the progress from the beginning. However answers will be saved in browsers local storage.

### Options

`options` is an object with optional properties:

| name                                                                                                                   | type               | description                                                                                                                                                                                                                                                                                            | default                                                       |
| ---------------------------------------------------------------------------------------------------------------------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------- |
| [container](https://codesandbox.io/s/github/Typeform/embed-demo/tree/main/demo-html/widget-js)                         | HTMLElement        | specify element to place the embed into, only for widget, required                                                                                                                                                                                                                                     | current element when embedding as HTML, otherwise `undefined` |
| [chat](https://codesandbox.io/s/github/Typeform/embed-demo/tree/main/demo-html/chat)                                   | boolean            | embed the typeform as [Chat UI](https://help.typeform.com/hc/en-us/articles/360034224732-Turn-your-typeform-into-a-chat)                                                                                                                                                                               | `false`                                                       |
| [position](https://codesandbox.io/s/github/Typeform/embed-demo/tree/main/demo-html/slider-js)                          | string             | slider position: `right` or `left`                                                                                                                                                                                                                                                                     | `right`                                                       |
| [size](https://codesandbox.io/s/github/Typeform/embed-demo/tree/main/demo-html/popup-html)                             | number             | size of the popup in percentage (desktop only, opens in fullscreen on mobile devices)                                                                                                                                                                                                                  | `100` (100% size, fullscreen popup)                           |
| [width](https://codesandbox.io/s/github/Typeform/embed-demo/tree/main/demo-html/popup-html)                            | number             | width of the embed in pixels (for popup you can specify `size` instead)                                                                                                                                                                                                                                | `undefined`                                                   |
| [height](https://codesandbox.io/s/github/Typeform/embed-demo/tree/main/demo-html/popup-html)                           | number             | height of the embed in pixels, supported by all embeds except slider (for popup you can specify `size` instead)                                                                                                                                                                                        | `undefined`                                                   |
| [hidden](https://codesandbox.io/s/github/Typeform/embed-demo/tree/main/demo-html/widget-js)                            | object             | [hidden fields](https://help.typeform.com/hc/en-us/articles/360050448072-Hidden-fields-explained) to be passed to the form in [URL hash](https://developer.mozilla.org/en-US/docs/Web/API/URL/hash)                                                                                                    | `undefined`                                                   |
| [tracking](https://codesandbox.io/s/github/Typeform/embed-demo/tree/main/demo-html/widget-html)                        | object             | [tracking parameters](https://help.typeform.com/hc/en-us/articles/360050914311-What-is-UTM-tracking-) to be passed to the form in [URL query string](https://developer.mozilla.org/en-US/docs/Web/API/URL/search)                                                                                      | `undefined`                                                   |
| [source](https://codesandbox.io/s/github/Typeform/embed-demo/tree/main/demo-html/callbacks)                            | string             | domain name of the site using the SDK                                                                                                                                                                                                                                                                  | domain name from `window.location`                            |
| [medium](https://codesandbox.io/s/github/Typeform/embed-demo/tree/main/demo-html/widget-js)                            | string             | name of the plugin built on top of the SDK                                                                                                                                                                                                                                                             | `"embed-sdk"`                                                 |
| mediumVersion                                                                                                          | string             | version of the plugin built on top of the SDK                                                                                                                                                                                                                                                          | `"next"`                                                      |
| [transitiveSearchParams](https://codesandbox.io/s/github/Typeform/embed-demo/tree/main/demo-html/transitive-params-js) | string[] / boolean | search parameters to be forwarded from host page to form, if `true` will forward all host page search parameters                                                                                                                                                                                       | `undefined`                                                   |
| hideFooter                                                                                                             | boolean            | hide form progress bar and navigation buttons (does not apply to Chat UI)                                                                                                                                                                                                                              | `false`                                                       |
| hideHeaders                                                                                                            | boolean            | hide header that appears when you have a question group, or a long question (does not apply to Chat UI)                                                                                                                                                                                                | `false`                                                       |
| domain                                                                                                                 | string             | domain name of the environment the SDK should run against                                                                                                                                                                                                                                              | `"https://form.typeform.com"`                                 |
| [opacity](https://codesandbox.io/s/github/Typeform/embed-demo/tree/main/demo-html/widget-inline)                       | number             | form background opacity, number from 0 (fully transparent) 100 (fully opaque)                                                                                                                                                                                                                          | `100`                                                         |
| [autoFocus](https://codesandbox.io/s/github/Typeform/embed-demo/tree/main/demo-html/widget-focus)                      | boolean            | enable form auto focus when loaded                                                                                                                                                                                                                                                                     | `false`                                                       |
| [open](https://codesandbox.io/s/github/Typeform/embed-demo/tree/main/demo-html/load-js)                                | string             | open embed based on user action (see below)                                                                                                                                                                                                                                                            | `undefined`                                                   |
| [openValue](https://codesandbox.io/s/github/Typeform/embed-demo/tree/main/demo-html/time-js)                           | number             | based on `open` (see below)                                                                                                                                                                                                                                                                            | `undefined`                                                   |
| [enableSandbox](https://codesandbox.io/s/github/Typeform/embed-demo/tree/main/demo-html/widget-sandbox)                | boolean            | enable [sandbox mode](https://help.typeform.com/hc/en-us/articles/360029295952) (disables submissions and tracking)                                                                                                                                                                                    | `false`                                                       |
| [buttonText](https://codesandbox.io/s/github/Typeform/embed-demo/tree/main/demo-html/sidetab-js)                       | string             | customize the button text (sidetab only)                                                                                                                                                                                                                                                               | `"Launch me"`                                                 |
| [customIcon](https://codesandbox.io/s/github/Typeform/embed-demo/tree/main/demo-html/popover-js)                       | string             | customize the message icon (popover, sidetab) [more info](#custom-icon)                                                                                                                                                                                                                                | `undefined`                                                   |
| [tooltip](https://codesandbox.io/s/github/Typeform/embed-demo/tree/main/demo-html/popover-html)                        | string             | display tooltip text next to the button (popover only)                                                                                                                                                                                                                                                 | `undefined`                                                   |
| [notificationDays](https://codesandbox.io/s/github/Typeform/embed-demo/tree/main/demo-html/popover-html)               | number             | display red notification dot, hide for given number of days since popover is open (popover only)                                                                                                                                                                                                       | `undefined`                                                   |
| [autoClose](https://codesandbox.io/s/github/Typeform/embed-demo/tree/main/demo-html/autoclose)                         | number / boolean   | time (ms) until the embedded typeform will automatically close after a respondent clicks the Submit button. (all embeds except widget)                                                                                                                                                                 | `undefined`                                                   |
| [onReady](https://codesandbox.io/s/github/Typeform/embed-demo/tree/main/demo-html/callbacks)                           | function           | fires when the form is loaded                                                                                                                                                                                                                                                                          | `undefined`                                                   |
| [onSubmit](https://codesandbox.io/s/github/Typeform/embed-demo/tree/main/demo-html/callbacks)                          | function           | fires when user submits the form                                                                                                                                                                                                                                                                       | `undefined`                                                   |
| [onClose](https://codesandbox.io/s/github/Typeform/embed-demo/tree/main/demo-html/callbacks)                           | function           | fires when the form is closed (when opened in modal window)                                                                                                                                                                                                                                            | `undefined`                                                   |
| [onQuestionChanged](https://codesandbox.io/s/github/Typeform/embed-demo/tree/main/demo-html/callbacks)                 | function           | fires when user navigates between form questions                                                                                                                                                                                                                                                       | `undefined`                                                   |
| [onHeightChanged](https://codesandbox.io/s/github/Typeform/embed-demo/tree/main/demo-html/callbacks)                   | function           | fires when form question height changes (eg. on navigation between questions or on error message)                                                                                                                                                                                                      | `undefined`                                                   |
| [onEndingButtonClick](https://codesandbox.io/s/github/Typeform/embed-demo/tree/main/demo-html/callbacks)               | function           | fires when button on ending screen is clicked, disables button redirect functionality                                                                                                                                                                                                                  | `undefined`                                                   |
| [autoResize](https://codesandbox.io/s/github/Typeform/embed-demo/tree/main/demo-html/widget-autoresize)                | string / boolean   | resize form to always fit the displayed question height, avoid scrollbars in the form (inline widget only), set min and max height separated by coma, eg. `"200,600"`                                                                                                                                  | `false`                                                       |
| [shareGaInstance](https://codesandbox.io/s/github/Typeform/embed-demo/tree/main/demo-html/widget-inline)               | string / boolean   | shares Google Analytics instance of the host page with embedded typeform, you can provide your Google Analytics ID to specify which instance to share (if you have more than one in your page)                                                                                                         | `false`                                                       |
| [inlineOnMobile](https://codesandbox.io/s/github/Typeform/embed-demo/tree/main/demo-html/widget-inline)                | boolean            | removes placeholder welcome screen in mobile and makes form show inline instead of fullscreen                                                                                                                                                                                                          | `false`                                                       |
| [iframeProps](https://codesandbox.io/s/github/Typeform/embed-demo/tree/main/demo-html/widget-js)                       | object             | HTML attributes to be passed directly to the iframe with typeform                                                                                                                                                                                                                                      | `undefined`                                                   |
| [lazy](https://codesandbox.io/s/github/Typeform/embed-demo/tree/main/demo-html/widget-lazy-html)                       | boolean            | enable lazy loading (for widget only), typeform starts loading when user scrolls to it, [see demo](https://github.com/Typeform/embed-demo/blob/main/demo-html/widget-lazy-html/index.html)                                                                                                             | `false`                                                       |
| [keepSession](https://codesandbox.io/s/github/Typeform/embed-demo/tree/main/demo-html/keep-session-html)               | boolean            | preserve form state when modal window is closed (and re-opened)                                                                                                                                                                                                                                        | `false`                                                       |
| redirectTarget                                                                                                         | string             | target for [typeforms with redirect](https://www.typeform.com/help/a/redirect-on-completion-or-redirect-through-endings-360060589532/), valid values are `_self`, `_top`, `_blank` or `_parent` ([see docs on anchor target](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attr-target)) | `_parent`                                                     |
| disableScroll                                                                                                          | boolean            | disable navigation between questions via scrolling and swiping                                                                                                                                                                                                                                         | `false`                                                       |
| hubspot                                                                                                                | boolean            | enable HubSpot source tracking - for details see article [Set up source tracking for HubSpot](https://www.typeform.com/help/a/set-up-source-tracking-for-hub-spot-4413167079316/)                                                                                                                      | `false`                                                       |
| [fullScreen](https://codesandbox.io/s/github/Typeform/embed-demo/tree/main/demo-html/widget-full-screen-html)          | boolean            | enable full screen view, set `<body>` size, resize on screen resize - also when browser navbars are displayed on mobile                                                                                                                                                                                | `false`                                                       |

### Options in plain HTML embed

- to embed via HTML without writing JavaScript code, use `data-tf-widget="<form-id>"` for widget embed (see example above)
- define options as data attributes with `data-tf-` prefix and dashes in name (eg. `autoFocus` becomes `data-tf-auto-focus`)
- set a boolean property to `true` by omitting attribute value, (eg. `<div ... data-tf-disable-footer></div>`
- pass function name for callbacks, eg. `data-tf-on-ready="myReadyFunction"` if this function is available on global scope (eg. `window`)
- to pass `string[]` use comma-separated string, eg. `transitiveSearchParams: ['foo', 'bar']` becomes `data-tf-transitive-search-params="foo,bar"`
- to pass `object` pass comma-separated key=value pairs, eg. `hidden: { foo: "f", bar: "b" }` becomes `data-tf-hidden="foo=f,bar=b"`
  - **Note:** since commas `,` are used as delimiter for each value you will need to escape them with backward slash, eg. `data-tf-hidden="foo=foo\,bar"`. In JavaScript you don't need to escape it.

### Custom Launch Options

Properties `open` and `openValue` apply only to embed types that are opened by user action (all except widget). They define when to automatically open the typeform.

- on page load
  - `open: 'load'`
  - `openValue` leave undefined (not used)
- when user tries to leave the page
  - `open: 'exit'`
  - `openValue` specify the sensitivity threshold
  - To detect user is trying to exit the page we detect upwards mouse movement in top part of the website. The threshold defines height of this area. Useful when you have navigation in top part of your website and mouse movement in that area does not necessarily indicate exit intent.
- when a user scrolls the page
  - `open: 'scroll'`
  - `openValue` percentage of page scrolled (0 - 100) to open the form
- after time elapsed
  - `open: 'time'`
  - `openValue` number of milliseconds to wait before opening the form

For details see [behavioral demo](../demo-html/public/behavioral-html).

### Share Google Analytics Instance

You can use `shareGaInstance: true` (or `data-tf-share-ga-instance`) attribute if both your page and your typeform are using Google Analytics. This will make sure the session is shared and Google Analytics will track only 1 user when they visit you page with an embedded typeform.

If you have more than 1 Google Analytics tracking codes in your website you can provide an ID to specify which tracker to use, eg:

```html
<div data-tf-widget="<form-id>" data-tf-share-ga-instance="UA-XXXXXX-XX"></div>
```

or

```javascript
createPopup('<form-id>', { container, shareGaInstance: 'UA-XXXXXX-XX' })
```

### Callbacks

You can listen to form events by providing callback methods:

```html
<button id="btn">click</button>
<script src="//embed.typeform.com/next/embed.js"></script>
<link rel="stylesheet" href="//embed.typeform.com/next/css/widget.css" />
<script>
  const { open } = window.tf.createPopup('<form-id>', {
    onReady: ({ formId }) => {
      console.log(`Form ${formId} is ready`)
    },
    onQuestionChanged: ({ formId, ref }) => {
      console.log(`Question in form ${formId} changed to ${ref}`)
    },
    onHeightChanged: ({ formId, ref, height }) => {
      console.log(`Question ${ref} in form ${formId} has height ${height}px now`)
    },
    onSubmit: ({ formId, responseId }) => {
      console.log(`Form ${formId} submitted, response id: ${responseId}`)
      // to retrieve the response use `responseId` (you have to do it server-side)
      // more details: https://developer.typeform.com/responses/
    },
    onClose: ({ formId }) => {
      console.log(`Modal window with form ${formId} was closed`)
    }
    onEndingButtonClick: ({ formId }) => {
      console.log(`Ending button clicked in form ${formId}`)
    }
  })
  document.querySelector('#btn').click = () => {
    open()
  }
</script>
```

Callback method receive payload object from the form. Each payload contains form ID to identify which form sent the event (see chaining typeforms below):

- onReady
  - `formId` (string)
- onQuestionChanged
  - `formId` (string)
  - `ref` (string) identifies currently displayed question
- onHeightChanged
  - `formId` (string)
  - `ref` (string) identifies currently displayed question
  - `height` (number) current height of currently displayed question
- onSubmit
  - `formId` (string)
  - `responseId` (string) identifies the response, can be retrieved via [Responses API](https://developer.typeform.com/responses/)
- onClose
  - no payload
- onEndingButtonClick
  - `formId` (string)

See [callbacks example in demo package](../../packages/demo-html/public/callbacks.html).

### Custom icon

Custom icon provided string supports:

- URL (used as an img src)
- Text and Emojis
- HTML Markup

### Redirect Target

You can supply a target for typeform redirect (on submit or via ending). It works the same as [target for anchor HTML element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attr-target):

- `_parent` (default), opens in parent page
- `_self` opens in the same embedded iframe as your typeform
- `_top` opens in current browser tab (same as `_parent` unless there are multiple nested iframes)
- `_blank` opens in new tab, however it might be blocked by popup blockers.

**⚠️ Warning:** Target `_blank` is not working in Safari (both desktop and mobile) and triggers a popup warning in Chrome on Android. It works in Chrome and Firefox on desktop.

### Positioning and overlapping

All embeds that are intended to be displayed over existing content in the website have **z-index set to 10001**.
If you want to display content over your typeform you need to make sure it has higher z-index. However if you want
your typeform to display over other content in your website you need to set its z-index to a value of 10000 or lower.

This is related to all embeds:

- popup
- slider
- sidetab
- popover
- widget - on mobile devices widget opens in fullscreen modal window (unless `inlineOnMobile` is set)

### Chaining typeforms

You can chain multiple typeforms inside an embed. You need to [setup a redirect to another typeform](https://www.typeform.com/help/a/redirect-to-url-or-redirect-with-end-screens-360060589532/):

- make sure to use URL with `typeform.com` domain in case you have a custom domain set up
- set `redirectTarget` / `data-tf-redirect-target` to `_self` to make the redirect inside the embed iframe

When you chain multiple typeforms they will be all displayed inside the embed and all embed options and callbacks will be preserved.
You can use `formId` in the callback payload to identify which form is currently displayed.

### Loading and reloading embedded forms

When the library loads it will initialize all HTML embed codes already present in the page.
However sometimes you might want to add HTML snippet to your page later and initialize it after it was added.

To load new snippets use:

```javascript
window.tf.load()
```

If you need to reload all snippets in the page:

```javascript
window.tf.reload()
```

You can see an example of this in [reload-event.html](../demo-html/public/reload-event.htm).

### Examples

You can find examples for specific use-cases in our demos:

- [HTML demo](../../packages/demo-html)
- [Webpack demo](../../packages/demo-webpack)
- [React demo](../../packages/demo-react)
- [Next.js demo](../../packages/demo-nextjs)
- [Codesandbox demo](https://github.com/Typeform/embed-demo)

## Local setup and development

[Fork and clone](https://docs.github.com/en/github/getting-started-with-github/fork-a-repo) this Github repo: https://github.com/Typeform/embed

Requirements:

- node >= 14 (for node v12 use [v1.38.0](https://www.npmjs.com/package/@typeform/embed/v/1.38.0))
- yarn

Install dependencies:

```bash
yarn
```

We recommend you work in a branch:

```bash
git checkout -b cool-new-feature
```

Build, watch for changes and start a demo server too (using `demo-nextjs`)

```bash
yarn demo
```

Build and watch for changes:

```bash
yarn dev
```

Run unit tests:

```bash
yarn test
```

Run functional tests via Cypress:

```bash
yarn cy:run   # run in background (headless)
yarn cy:open  # open cypress UI
```

See details on [contributing to this repo](https://github.com/Typeform/embed#contribution).
