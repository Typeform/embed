---
title: Vanilla Embed Library - Configuration
nav_title: -- Configuration
nav_order: 13
---

# Configuration

You can configure your embed by setting different options.

In JavaScript you pass options as an object:

```javascript
import { createWidget } from '@typeform/embed'
import '@typeform/embed/build/css/widget.css'

const options = {
  // TODO: define your embed options here, see below
}

createWidget('<form-id>', options)
```

If you embed via HTML, you need to pass optinos as attributes with `data-tf-` prefix:

```html
<a data-tf-popup="<form-id>" data-tf-size="50" data-tf-hide-footer>open</a>
<script src="//embed.typeform.com/next/embed.js"></script>
```

## Available options

`options` is an object with optional properties:

| name                   | type             | description                                                                                                                                                                                                       | default                                                       |
| ---------------------- | ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| container              | HTMLElement      | specify element to place the embed into, only for widget, required                                                                                                                                                | current element when embedding as HTML, otherwise `undefined` |
| chat                   | boolean          | embed the typeform as [Chat UI](https://help.typeform.com/hc/en-us/articles/360034224732-Turn-your-typeform-into-a-chat)                                                                                          | `false`                                                       |
| position               | string           | slider position: `right` or `left`                                                                                                                                                                                | `right`                                                       |
| size                   | number           | size of the popup in percentage                                                                                                                                                                                   | `100` (100% size, fullscreen popup)                           |
| width                  | number           | width of the embed in pixels (for popup you can specify `size` instead)                                                                                                                                           | `undefined`                                                   |
| height                 | number           | height of the embed in pixels, supported by all embeds except slider (for popup you can specify `size` instead)                                                                                                   | `undefined`                                                   |
| hidden                 | object           | [hidden fields](https://help.typeform.com/hc/en-us/articles/360050448072-Hidden-fields-explained) to be passed to the form in [URL hash](https://developer.mozilla.org/en-US/docs/Web/API/URL/hash)               | `undefined`                                                   |
| tracking               | object           | [tracking parameters](https://help.typeform.com/hc/en-us/articles/360050914311-What-is-UTM-tracking-) to be passed to the form in [URL query string](https://developer.mozilla.org/en-US/docs/Web/API/URL/search) | `undefined`                                                   |
| source                 | string           | domain name of the site using the SDK                                                                                                                                                                             | domain name from `window.location`                            |
| medium                 | string           | name of the plugin built on top of the SDK                                                                                                                                                                        | `"embed-sdk"`                                                 |
| mediumVersion          | string           | version of the plugin built on top of the SDK                                                                                                                                                                     | `"next"`                                                      |
| transitiveSearchParams | string[]         | search parameters to be forwarded from host page to form                                                                                                                                                          | `undefined`                                                   |
| hideFooter             | boolean          | hide form progress bar and navigation buttons (does not apply to Chat UI)                                                                                                                                         | `false`                                                       |
| hideHeaders            | boolean          | hide header that appears when you have a question group, or a long question (does not apply to Chat UI)                                                                                                           | `false`                                                       |
| opacity                | number           | form background opacity, number from 0 (fully transparent) 100 (fully opaque)                                                                                                                                     | `100`                                                         |
| disableAutoFocus       | boolean          | disable form auto focus when loaded                                                                                                                                                                               | `false`                                                       |
| open                   | string           | open embed based on user action (see below)                                                                                                                                                                       | `undefined`                                                   |
| openValue              | number           | based on `open` (see below)                                                                                                                                                                                       | `undefined`                                                   |
| enableSandbox          | boolean          | enable [sandbox mode](https://help.typeform.com/hc/en-us/articles/360029295952) (disables submissions and tracking)                                                                                               | `false`                                                       |
| buttonText             | string           | customize the button text (sidetab only)                                                                                                                                                                          | `"Launch me"`                                                 |
| customIcon             | string           | customize the message icon (popover, sidetab) )                                                                                                                                                                   | `undefined`                                                   |
| tooltip                | string           | display tooltip text next to the button (popover only)                                                                                                                                                            | `undefined`                                                   |
| notificationDays       | number           | display red notification dot, hide for given number of days since popover is open (popover only)                                                                                                                  | `undefined`                                                   |
| autoClose              | number / boolean | time (ms) until the embedded typeform will automatically close after a respondent clicks the Submit button. (all embeds except widget)                                                                            | `undefined`                                                   |
| onReady                | function         | fires when the form is loaded                                                                                                                                                                                     | `undefined`                                                   |
| onSubmit               | function         | fires when user submits the form                                                                                                                                                                                  | `undefined`                                                   |
| onClose                | function         | fires when the form is closed (when opened in modal window)                                                                                                                                                       | `undefined`                                                   |
| onQuestionChanged      | function         | fires when user navigates between form questions                                                                                                                                                                  | `undefined`                                                   |
| shareGaInstance        | string / boolean | shares Google Analytics instance of the host page with embedded typeform, you can provide your Google Analytics ID to specify which instance to share (if you have more than one in your page)                    | `false`                                                       |
| inlineOnMobile         | boolean          | removes placeholder welcome screen in mobile and makes form show inline instead of fullscreen                                                                                                                     | `false`                                                       |
| iframeProps            | object           | HTML attributes to be passed directly to the iframe with typeform                                                                                                                                                 | `undefined`                                                   |
| lazy                   | boolean          | enable lazy loading (for widget only), typeform starts loading when user scrolls to it, [see demo](https://github.com/Typeform/embed-demo/blob/main/demo-html/widget-lazy-html/index.html)                        | `false`                                                       |
| keepSession            | boolean          | preserve form state when modal window is closed (and re-opened)                                                                                                                                                   | `false`                                                       |

## Options in plain HTML embed

To embed via HTML without writing JavaScript code, use `data-tf-widget="<form-id>"` for widget embed. You can define options as data attributes with `data-tf-` prefix and dashes in name (eg. `disableAutoFocus` becomes `data-tf-disable-autofocus`). For example:

```html
<div data-tf-popup="<form-id>" data-tf-size="50" data-tf-hide-footer></div>
<script src="//embed.typeform.com/next/embed.js"></script>
```

To set different option types:

- set a boolean property to `true` by omitting attribute value, (eg. `<div ... data-tf-disable-footer></div>`
- pass function name for callbacks, eg. `data-tf-on-ready="myReadyFunction"` if this function is available on global scope (eg. `window`)
- to pass `string[]` use coma-separated string, eg. `transitiveSearchParams: ['foo', 'bar']` becomes `data-tf-transitive-search-params="foo,bar"`
- to pass `object` pass coma-separated key=value pairs, eg. `hidden: { foo: "f", bar: "b" }` becomes `data-tf-hidden="foo=f,bar=b"`

## Custom Launch Options

You can open modal embed types (all except widget) based on user actions.

Properties `open` and `openValue` define when to automatically open the typeform.

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

To open a typeform in popup 1 minute after the page is loaded you can use this JavaScript code:

```javascript
import { createPopup } from '@typeform/embed'
import '@typeform/embed/build/css/popup.css'

createPopup('<form-id>', {
  open: 'time',
  openValue: 60000,
})
```

Or in HTML:

```html
<a data-tf-popup="<form-id>" data-tf-open="time" data-tf-open-value="60000"></a>
<script src="//embed.typeform.com/next/embed.js"></script>
```

You can [read more about this feature in our Help Center](https://www.typeform.com/help/a/advanced-embed-options-360049535352/).
