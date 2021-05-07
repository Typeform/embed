# 🛠 Typeform Vanilla Embed Library

**Typeform/embed** is the core embed library that lets you embed typeforms to your website using vanilla JavaScript.

## Installation

### As NPM package

Install:

```shell
yarn add @typeform/embed
```

Import the lib, CSS and create your embed:

```javascript
import { createWidget } from '@typeform/embed'
import '@typeform/embed/build/css/widget.css'
createWidget('<form-id>', { container: document.querySelector('#form') })
```

### From CDN

As HTML. CSS is imported automatically. Place this code where you want to display your form.

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
  document.querySelector('#button').click = toggle
</script>
```

### How to get form id of your form?

You can find `<form-id>` from the public URL of your form:

- `https://form.typeform.com/to/<form-id>`

Or from admin panel URL:

- `https://admin.typeform.com/form/<form-id>/*`

## Configuration

### Embed types

- widget: `createWidget('<form-id>', options)`
- popup: `createPopup('<form-id>', options)`
- slider: `createSlider('<form-id>', options)`
- sidetab: `createSidetab('<form-id>', options)`
- popover: `createPopover('<form-id>', options)`

### Options

`options` is an object with optional properties:

| name                   | type        | description                                                                                                                | default                                                       |
| ---------------------- | ----------- | -------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| container              | HTMLElement | specify element to place the embed into, only for widget, required                                                         | current element when embedding as HTML, otherwise `undefined` |
| chat                   | boolean     | embed the typeform as [Chat UI](https://help.typeform.com/hc/en-us/articles/360034224732-Turn-your-typeform-into-a-chat)   | `false`                                                       |
| size                   | number      | size of the popup in percentage                                                                                            | `100` (100% size, fullscreen popup)                           |
| width                  | number      | width of the embed in pixels (for popup you can specify `size` instead)                                                    | `undefined`                                                   |
| height                 | number      | height of the embed in pixels, supported by all embeds except slider (for popup you can specify `size` instead)            | `undefined`                                                   |
| hidden                 | object      | [hidden fields](https://help.typeform.com/hc/en-us/articles/360050448072-Hidden-fields-explained) to be passed to the form | `undefined`                                                   |
| source                 | string      | domain name of the site using the SDK                                                                                      | domain name from `window.location`                            |
| medium                 | string      | name of the plugin built on top of the SDK                                                                                 | `"embed-sdk"`                                                 |
| mediumVersion          | string      | version of the plugin built on top of the SDK                                                                              | `"next"`                                                      |
| transitiveSearchParams | string[]    | search parameters to be forwarded from host page to form                                                                   | `undefined`                                                   |
| hideFooter             | boolean     | hide form progress bar and navigation buttons (does not apply to Chat UI)                                                  | `false`                                                       |
| hideHeaders            | boolean     | hide header that appears when you have a question group, or a long question (does not apply to Chat UI)                    | `false`                                                       |
| opacity                | number      | form background opacity, number from 0 (fully transparent) 100 (fully opaque)                                              | `100`                                                         |
| disableAutoFocus       | boolean     | disable form auto focus when loaded                                                                                        | `false`                                                       |
| open                   | string      | open embed based on user action (see below)                                                                                | `undefined`                                                   |
| openValue              | number      | based on `open` (see below)                                                                                                | `undefined`                                                   |
| enableSandbox          | boolean     | enable [sandbox mode](https://help.typeform.com/hc/en-us/articles/360029295952)                                            | `false`                                                       |
| tooltip                | string      | display tooltip text next to the button (popover only)                                                                     | `undefined`                                                   |
| onReady                | function    | fires when the form is loaded                                                                                              | `undefined`                                                   |
| onSubmit               | function    | fires when user submits the form                                                                                           | `undefined`                                                   |
| onQuestionChanged      | function    | fires when user navigates between form questions                                                                           | `undefined`                                                   |

### Options in plain HTML embed

- to embed via HTML without writing JavaScript code, use `data-tf-widget="<form-id>"` for widget embed (see example above)
- define options as data attributes with `data-tf-` prefix and dashes in name (eg. `disableAutoFocus` becomes `data-tf-disable-autofocus`)
- set a boolean property to `true` by omitting attribute value, (eg. `<div ... data-tf-disable-footer></div>`
- pass function name for callbacks, eg. `data-tf-on-ready="myReadyFunction"` if this function is available on global scope (eg. `window`)
- to pass `string[]` use coma-separated string, eg. `transitiveSearchParams: ['foo', 'bar']` becomes `data-tf-transitive-search-params="foo,bar"`
- to pass `object` pass coma-separated key=value pairs, eg. `hidden: { foo: "f", bar: "b" }` becomse `data-tf-hidden="foo=f,bar=b"`

### Custom Launch Options

Properties `open` and `openValue` apply only to embed types that are opened by user action (all except widget). They define when to automatically open the typeform.

- on page load
  - `open: 'load'`
  - `openValue` leave undefined (not used)
- when user tries to leave the page
  - `open: 'exit'`
  - `openValue` specify the sensitivity threshold
  - To detect user is trying to exit the page we detect upwards mouse movement in top part of the website. The threshold defines height of this area. Usefull when you have navigation in top part of your website and mouse movement in that area does not necessarily indicate exit intent.
- when a user scrolls the page
  - `open: 'scroll'`
  - `openValue` percentage of page scrolled (0 - 100) to open the form
- after time elapsed
  - `open: 'time'`
  - `openValue` number of milliseconds to wait before opening the form

For details see [behavioral demo](../demo-html/public/behavioral-html).

### Callbacks

You can listen to form events by providing callback methods:

```html
<div id="wrapper"></div>
<script src="//embed.typeform.com/next/embed.js"></script>
<link rel="stylesheet" href="//embed.typeform.com/next/css/widget.css" />
<script>
  window.tf.createWidget('<form-id>', {
    container: document.getElementById("wrapper"),
    onReady: () => {
      console.log('form ready')
    }
    onQuestionChanged: (data) => {
      console.log('question changed to ref:', data.ref)
    }
    onSubmit: (data) => {
      console.log('forms submitted with id:', data.responseId)
      // to retrieve the response use `data.responseId` (you have to do it server-side)
      // more details: https://developer.typeform.com/responses/
    }
  })
</script>
```

Callback method receive payload object from the form:

- onReady
  - empty object
- onQuestionChanged
  - `ref` (string) identifies currenttly displayed question
- onReady
  - `responseId` (string) identifies the response, can be retrieved via [Responses API](https://developer.typeform.com/responses/)
  - `response_id` (string) same as above (for backward comaptibility with old embed SDK)

See [callbacks example in demo package](../../packages/demo-html/public/callbacks.html).

### Examples

You can find examples for specific use-cases in our demos:

- [HTML demo](../../packages/demo-html)
- [Webpack demo](../../packages/demo-webpack)
- [React demo](../../packages/demo-react)
- [Next.js demo](../../packages/demo-nextjs)

## Local setup and development

[Fork and clone](https://docs.github.com/en/github/getting-started-with-github/fork-a-repo) this Github repo: https://github.com/Typeform/embed

Requirements:

- node >= 10
- yarn

Install dependencies:

```bash
yarn
```

We recommend you work in a branch:

```bash
git checkout -b cool-new-feature
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
