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

| name                   | type             | description                                                                                                                                                                                                                                                                                            | default                                                       |
| ---------------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------- |
| container              | HTMLElement      | specify element to place the embed into, only for widget, required                                                                                                                                                                                                                                     | current element when embedding as HTML, otherwise `undefined` |
| position               | string           | slider position: `right` or `left`                                                                                                                                                                                                                                                                     | `right`                                                       |
| size                   | number           | size of the popup in percentage                                                                                                                                                                                                                                                                        | `100` (100% size, fullscreen popup)                           |
| width                  | number / string  | width of the embed - number in pixels or string including units (for popup you can specify `size` instead)                                                                                                                                                                                             | `undefined`                                                   |
| height                 | number / string  | height of the embed - number in pixels or string including units, supported by all embeds except slider (for popup you can specify `size` instead)                                                                                                                                                     | `undefined`                                                   |
| hidden                 | object           | [hidden fields](https://help.typeform.com/hc/en-us/articles/360050448072-Hidden-fields-explained) to be passed to the form in [URL hash](https://developer.mozilla.org/en-US/docs/Web/API/URL/hash)                                                                                                    | `undefined`                                                   |
| tracking               | object           | [tracking parameters](https://help.typeform.com/hc/en-us/articles/360050914311-What-is-UTM-tracking-) to be passed to the form in [URL query string](https://developer.mozilla.org/en-US/docs/Web/API/URL/search)                                                                                      | `undefined`                                                   |
| hubspot                | boolean          | enable HubSpot source tracking - for details see article [Set up source tracking for HubSpot](https://www.typeform.com/help/a/set-up-source-tracking-for-hub-spot-4413167079316/)                                                                                                                      | `false`                                                       |
| domain                 | string           | domain name of the environment the SDK should run against                                                                                                                                                                                                                                              | `"https://form.typeform.com"`                                 |
| source                 | string           | domain name of the site using the SDK                                                                                                                                                                                                                                                                  | domain name from `window.location`                            |
| medium                 | string           | name of the plugin built on top of the SDK                                                                                                                                                                                                                                                             | `"embed-sdk"`                                                 |
| mediumVersion          | string           | version of the plugin built on top of the SDK                                                                                                                                                                                                                                                          | `"next"`                                                      |
| transitiveSearchParams | string[]         | search parameters to be forwarded from host page to form                                                                                                                                                                                                                                               | `undefined`                                                   |
| hideFooter             | boolean          | hide form progress bar and navigation buttons                                                                                                                                                                                                                                                          | `false`                                                       |
| hideHeaders            | boolean          | hide header that appears when you have a question group, or a long question                                                                                                                                                                                                                            | `false`                                                       |
| opacity                | number           | form background opacity, number from 0 (fully transparent) 100 (fully opaque)                                                                                                                                                                                                                          | `100`                                                         |
| autoFocus              | boolean          | enable form auto focus when loaded                                                                                                                                                                                                                                                                     | `false`                                                       |
| open                   | string           | open embed based on user action (see below)                                                                                                                                                                                                                                                            | `undefined`                                                   |
| openValue              | number           | based on `open` (see below)                                                                                                                                                                                                                                                                            | `undefined`                                                   |
| preventReopenOnClose   | boolean          | prevent automatically re-opening the typeform                                                                                                                                                                                                                                                          | `false`                                                       |
| enableSandbox          | boolean          | enable [sandbox mode](https://help.typeform.com/hc/en-us/articles/360029295952) (disables submissions and tracking, the `responseId` in callbacks will have value of `"__sandbox"`)                                                                                                                    | `false`                                                       |
| buttonText             | string           | customize the button text (sidetab only)                                                                                                                                                                                                                                                               | `"Launch me"`                                                 |
| customIcon             | string           | customize the message icon (popover, sidetab) [more info](#custom-icon)                                                                                                                                                                                                                                | `undefined`                                                   |
| tooltip                | string           | display tooltip text next to the button (popover only)                                                                                                                                                                                                                                                 | `undefined`                                                   |
| notificationDays       | number           | display red notification dot, hide for given number of days since popover is open (popover only)                                                                                                                                                                                                       | `undefined`                                                   |
| autoClose              | number / boolean | time (ms) until the embedded typeform will automatically close after a respondent clicks the Submit button. (all embeds except widget)                                                                                                                                                                 | `undefined`                                                   |
| onReady                | function         | fires when the form is loaded                                                                                                                                                                                                                                                                          | `undefined`                                                   |
| onStarted              | function         | fires on the "submission start" event, contains `responseId` in the payload                                                                                                                                                                                                                            | `undefined`                                                   |
| onSubmit               | function         | fires when user submits the form                                                                                                                                                                                                                                                                       | `undefined`                                                   |
| onClose                | function         | fires when the form is closed (when opened in modal window)                                                                                                                                                                                                                                            | `undefined`                                                   |
| onQuestionChanged      | function         | fires when user navigates between form questions                                                                                                                                                                                                                                                       | `undefined`                                                   |
| onHeightChanged        | function         | fires when form question height changes (eg. on navigation between questions or on error message)                                                                                                                                                                                                      | `undefined`                                                   |
| onEndingButtonClick    | function         | fires when button on ending screen is clicked                                                                                                                                                                                                                                                          | `undefined`                                                   |
| onDuplicateDetected    | function         | fires when the respondent reaches the quota of responses defined in [the duplicate prevention setting](https://www.typeform.com/help/a/prevent-duplicate-responses-27917825492244/)                                                                                                                    | `undefined`                                                   |
| autoResize             | string / boolean | resize form to always fit the displayed question height, avoid scrollbars in the form (inline widget only), set min and max height separated by coma, eg. `"200,600"`                                                                                                                                  | `false`                                                       |
| shareGaInstance        | string / boolean | shares Google Analytics instance of the host page with embedded typeform, you can provide your Google Analytics ID to specify which instance to share (if you have more than one in your page)                                                                                                         | `false`                                                       |
| inlineOnMobile         | boolean          | removes placeholder welcome screen in mobile and makes form show inline instead of fullscreen                                                                                                                                                                                                          | `false`                                                       |
| iframeProps            | object           | HTML attributes to be passed directly to the iframe with typeform                                                                                                                                                                                                                                      | `undefined`                                                   |
| buttonProps            | object           | HTML attributes to be passed directly to the button created by embed SDK (only for popover and sidetab)                                                                                                                                                                                                | `undefined`                                                   |
| lazy                   | boolean          | enable lazy loading (for widget only), typeform starts loading when user scrolls to it, [see demo](https://github.com/Typeform/embed-demo/blob/main/demo-html/widget-lazy-html/index.html)                                                                                                             | `false`                                                       |
| keepSession            | boolean          | preserve form state when modal window is closed (and re-opened)                                                                                                                                                                                                                                        | `false`                                                       |
| redirectTarget         | string           | target for [typeforms with redirect](https://www.typeform.com/help/a/redirect-on-completion-or-redirect-through-endings-360060589532/), valid values are `_self`, `_top`, `_blank` or `_parent` ([see docs on anchor target](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attr-target)) | `_parent`                                                     |
| disableScroll          | boolean          | disable navigation between questions via scrolling and swiping                                                                                                                                                                                                                                         | `false`                                                       |
| preselect              | object           | preselect answer to the first question ([more info in help center](https://www.typeform.com/help/a/preselect-answers-through-typeform-links-for-advanced-users-4410202791060/))                                                                                                                        | `undefined`                                                   |
| respectOpenModals      | `all` / `same`   | do not open if there already is a modal with typeform open (`same` - same form, `all` - any form)                                                                                                                                                                                                      | `undefined`                                                   |
| region                 | `eu` / `'us'`    | Forwards compatible change to allow customers to configure the Embed for Typeform accounts in the different regions (not available for customers yet, documentation to be updated accordingly once Typeform releases the new platform)                                                                 | `undefined` (defaulting to 'us' internally)                   |

## Options in plain HTML embed

To embed via HTML without writing JavaScript code, use `data-tf-widget="<form-id>"` for widget embed. You can define options as data attributes with `data-tf-` prefix and dashes in name (eg. `autoFocus` becomes `data-tf-auto-focus`). For example:

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
If you wish to prevent automatically re-opening the typeform you can set `preventReOpenOnClose`.

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
  preventReopenOnClose: true,
})
```

Or in HTML:

```html
<a data-tf-popup="<form-id>" data-tf-open="time" data-tf-open-value="60000" data-tf-prevent-reopen-on-close></a>
<script src="//embed.typeform.com/next/embed.js"></script>
```

You can [read more about this feature in our Help Center](https://www.typeform.com/help/a/advanced-embed-options-360049535352/).

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

### Chaining typeforms

You can chain multiple typeforms inside an embed. You need to [setup a redirect to another typeform](https://www.typeform.com/help/a/redirect-to-url-or-redirect-with-end-screens-360060589532/):

- make sure to use URL with `typeform.com` domain in case you have a custom domain set up
- set `redirectTarget` / `data-tf-redirect-target` to `_self` to make the redirect inside the embed iframe

When you chain multiple typeforms they will be all displayed inside the embed and all embed options and callbacks will be preserved.
You can use `formId` in the callback payload to identify which form is currently displayed.
