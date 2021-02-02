# Embed

[![Release](https://github.com/Typeform/embed/workflows/Release/badge.svg)](https://github.com/Typeform/embed/actions?query=workflow%3ARelease)
[![minzipped size](https://img.shields.io/bundlephobia/minzip/@typeform/embed)](https://www.npmjs.com/package/@typeform/embed)
[![npm](https://img.shields.io/npm/dm/localeval.svg)](https://www.npmjs.com/package/@typeform/embed)

**Typeform/embed** is the client-side script and a [CommonJS module](http://webpack.github.io/docs/commonjs.html) that allows you to integrate a typeform into your website easily.

This README file contains instructions to embed typeform into your website. If you are looking to set up the project locally for development and contribution, see [CONTRIBUTING.md](CONTRIBUTING.md).

If you are not comfortable with frontend development you can [embed typeform via code snippets](https://www.typeform.com/help/embed-a-typeform/)

## Getting Started

Requirements:

- `node` >= 12
- `yarn` (or `npm`)

### Installation

#### NPM package

We recommend to use `yarn` as your package manager, and also a build tool like webpack or browserify in order to use it.

```bash
yarn add @typeform/embed
```

The NPM version doesn't include neither React, ReacDOM nor polyfills. It's a responsibility of the application to provide those deps as peer dependencies and control the environment polyfilling process.

#### CDN script

You can also consume the library from our [CDN](https://embed.typeform.com/embed.js):

```html
<script src="https://embed.typeform.com/embed.js"></script>
<!-- this script exposes the API to `window.typeformEmbed` -->
```

The CDN version has everything bundled, so the script is ready to use out-of the box. It contains react, react-dom, and polyfills. If you believe everything is already injected in your environment globals you can use a more lightweight version, **_although it's not recommended_**:

```html
<script src="https://embed.typeform.com/embed.pure.js"></script>
<!-- this script exposes the API to `window.typeformEmbed` -->
```

### Usage

```js
// Using ES6 imports
import * as typeformEmbed from '@typeform/embed'
// or require
const typeformEmbed = require('@typeform/embed')
```

#### With React Hooks

```jsx
import React, { useRef, useEffect } from 'react'
import * as typeformEmbed from '@typeform/embed'

const MyTypeform = () => {
  const typeformRef = useRef(null)

  useEffect(() => {
    typeformEmbed.makeWidget(typeformRef.current, 'https://form.typeform.com/to/MY_TYPEFORM_ID', {
      hideFooter: true,
      hideHeaders: true,
      opacity: 50,
    })
  }, [typeformRef])

  return <div ref={typeformRef} style={{ height: '100vh', width: '100%' }}></div>
}
```

## Types of Embed

### Widget

Use a widget to embed a typeform inside any HTML element on your page

```js
typeformEmbed.makeWidget(element, url, options)
```

- **element**: the DOM element that the widget will be appended to
- **url**: typeform's URL (like: `https://admin.typeform.com/to/PlBzgL`)
- **options**: Object with the optional parameters:

  | option                       | description                                                                                                                                                    | values     | default |
  | ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- | ------- |
  | opacity                      | You can make your typeform's background totally transparent, or opaque. (For example, to have a video as a background)                                         | `Number`   | 100     |
  | buttonText                   | The button text that appears on mobile in order to open the typeform.                                                                                          | `String`   | "Start" |
  | hideScrollbars               | Hide fixed scrollbars.                                                                                                                                         | `Boolean`  | false   |
  | hideFooter                   | Hide typeform footer, that appears showing the progress bar and the navigation buttons.                                                                        | `Boolean`  | false   |
  | hideHeaders                  | Hide typeform header, that appears when you have a Question group, or a long question that you need to scroll through to answer, like a Multiple Choice block. | `Boolean`  | false   |
  | onSubmit                     | Callback function that will be executed right after the typeform is successfully submitted.                                                                    | `Function` | -       |
  | onReady                      | Callback function that will be executed once the typeform is ready.                                                                                            | `Function` | -       |
  | onScreenChanged              | Callback function that will be executed once the typeform's active screen changes.                                                                             | `Function` | -       |
  | transferableUrlParameters.   | Parameters that we want to transfert from the URL to the Typeform as hidden fields                                                                             | `Array`    | []      |
  | source                       | Domain name of the site using the SDK                                                                                                                          | `String`   | null    |
  | medium                       | Name of the plugin built on top of the SDK                                                                                                                     | `String`   | null    |
  | mediumVersion                | Version of the plugin built on top of the SDK                                                                                                                  | `String`   | null    |
  | shareGoogleAnalyticsInstance | Allows to share the Google instance of the page with the Typeform in the embed                                                                                 | `Boolean`  | false   |

  #### Example:

  ```js
  // Here we are getting an existing element on your HTML
  const embedElement = document.querySelector('.js-typeform-embed')

  typeformEmbed.makeWidget(embedElement, 'https://admin.typeform.com/to/PlBzgL', {
    opacity: 55,
    buttonText: 'Answer this!',
    hideScrollbars: true,
    onSubmit: function () {
      console.log('Typeform successfully submitted')
    },
    onReady: function () {
      console.log('Typeform is ready')
    },
  })
  ```

### Popup

Use a popup to embed the typeform in a modal window.

```js
typeformEmbed.makePopup(url, options)
```

- **url**: typeform's URL (like: `https://admin.typeform.com/to/PlBzgL`)
- **options**: Object with the optional parameters:

  | option                       | description                                                                                                                                                                       | values                                                                                                               | default                                                                |
  | ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
  | mode                         | The way of showing the popup                                                                                                                                                      | `String` any of: <br/> `"popup"` <br/> `"drawer_left"` <br/> `"drawer_right"` <br/> `"popover"` <br/> `"side_panel"` | "popup"                                                                |
  | ❌ autoOpen                  | Your typeform will launch as soon as your web page is opened **Deprecated:** Use `open: "load"` instead                                                                           | `Boolean`                                                                                                            | false                                                                  |
  | 💡 open                      | Your typeform will launch based on behavioral triggers                                                                                                                            | `String` any of: <br/> `"exit"` <br/> `"load"` <br/> `"scroll"` <br/> `"time"`                                       | null                                                                   |
  | 💡 openValue                 | Configuration for behavioral triggers. Based on `open`: <br/> - `"exit"`: exit threshold in pixels <br/> - `"scroll"`: % of page scrolled <br/> \* `"time"`: time in milliseconds | `Number`                                                                                                             | null                                                                   |
  | autoClose                    | Time until the embedded typeform will automatically close after a respondent clicks the Submit button. The default time is 5 seconds. PRO+ users can change the `autoClose` time. | `Number` (seconds)                                                                                                   | -                                                                      |
  | hideScrollbars               | Hide fixed scrollbars.                                                                                                                                                            | `Boolean`                                                                                                            | false                                                                  |
  | hideFooter                   | Hide typeform footer, that appears showing the progress bar and the navigation buttons.                                                                                           | `Boolean`                                                                                                            | false                                                                  |
  | hideHeaders                  | Hide typeform header, that appears when you have a Question group, or a long question that you need to scroll through to answer, like a Multiple Choice block.                    | `Boolean`                                                                                                            | false                                                                  |
  | ❌ drawerWidth               | Specify the width of the drawer (only applies if using `mode` `"drawer_left"` or `"drawer_right"`).                                                                               | `Number` (pixels)                                                                                                    |                                                                        |
  | width                        | Specify the width of the drawer or popup (only applies if using `mode` `"drawer_left"` or `"drawer_right"` or `"popover"` or `"side_panel"`).                                     | `Number` (pixels)                                                                                                    | 800 for `"drawer_left"` and `"drawer_right"` <br/> 320 for `"popover"` |
  | height                       | Specify the height of the popup (only applies if using `mode` `"popover"` or `"side_panel"`).                                                                                     | `Number` (pixels)                                                                                                    | 500                                                                    |
  | size                         | Specify the size of the popup (only applies if using `mode` `"popup"`).                                                                                                           | `Number` (percent)                                                                                                   | 100                                                                    |
  | onSubmit                     | Callback function that will be executed right after the typeform is successfully submitted.                                                                                       | `Function`                                                                                                           | -                                                                      |
  | onReady                      | Callback function that will be executed once the typeform is ready.                                                                                                               | `Function`                                                                                                           | -                                                                      |
  | onScreenChanged              | Callback function that will be executed once the typeform's active screen changes.                                                                                                | `Function`                                                                                                           | -                                                                      |
  | onClose                      | Callback function that will be executed once the typeform is closed.                                                                                                              | `Function`                                                                                                           | -                                                                      |
  | container                    | Element to place the popup into. Optional. Required only for `"side_panel"` mode.                                                                                                 | `DOM element`                                                                                                        | -                                                                      |
  | transferableUrlParameters    | Parameters that we want to transfert from the URL to the Typeform as hidden fields                                                                                                | `Array`                                                                                                              | []                                                                     |
  | source                       | Domain name of the site using the SDK                                                                                                                                             | `String`                                                                                                             | null                                                                   |
  | medium                       | Name of the plugin built on top of the SDK                                                                                                                                        | `String`                                                                                                             | null                                                                   |
  | mediumVersion                | Version of the plugin built on top of the SDK                                                                                                                                     | `String`                                                                                                             | null                                                                   |
  | shareGoogleAnalyticsInstance | Allows to share the Google instance of the page with the Typeform in the embed                                                                                                    | `Boolean`                                                                                                            | false                                                                  |

Types:

- ❌ Deprecated option. Will be removed in future.
- 💡 Experimental option. Implementation might change in future without prior notice. Use at your own risk.

#### Example:

```js
typeformEmbed.makePopup('https://admin.typeform.com/to/PlBzgL', {
  mode: 'drawer_left',
  open: 'scroll',
  openValue: 30,
  autoClose: 3,
  hideScrollbars: true,
  onSubmit: function () {
    console.log('Typeform successfully submitted')
  },
  onReady: function () {
    console.log('Typeform is ready')
  },
  onClose: function () {
    console.log('Typeform is closed')
  },
})
```

More examples:

- [popups via embed code snippet](./demo/popup.html)
- [popups via API](./demo/popup-api.html)

### `onSubmit` event

Callback function `onSubmit` receives `event` object with next properties:

| Parameter     | Type   | Description        |
| ------------- | ------ | ------------------ |
| `response_id` | string | ID of the response |

#### Example:

```javascript
const reference = typeformEmbed.makePopup('https://admin.typeform.com/to/PlBzgL', {
  onSubmit: function (event) {
    console.log(event.response_id)
  },
})
```

## Troubleshooting

### An element in my page is over the typeform

For the modal modes (popup, drawer and mobile), we use a z-index of 1000 by default. Take this into account when you want an element to be over or under the typeform modal.

### When loading a typeform in mobile, a screen with the typeform name and a 'Start' button appears before the typeform

To get the best experience, on mobile all embedded typeforms are oppened in a fullscreen modal. The popup type behaves as expected, but a widget on mobile has an additional screen to launch the modal. This screen includes the typeform title and a button to lanch the typeform itself.

If you want to override this behaviour, the best option is to use the API with `makePopup` to open the typeform modal when you decide.

### After opening a typeform in mobile, a `<meta name="viewport">` tag is added to the document

This tag is needed for the correct visualization of the typeform. This is only a problem if you don't have this tag in your site.

### Typeform does not look good with a small embed

Although we have no hard limit, we recommend having a height of at least 350px.

### Typeform not visible after pressing 'Start' in mobile

We use `position: fixed` to position our modal relative to its containing block established by the viewport. If one of the modal ancestors has a `transform`, `perspective`, or `filter` css property set to something other than `none` the positioning will be relative to it and probably not visible by the user.

## Feedback

We are always open to your [feedback](https://tfproductops.typeform.com/to/RGpsdc).

## Contribution

We'd love to have your helping hand on typeform's embed. See [CONTRIBUTING.md](CONTRIBUTING.md) for more information on what we're looking for and how to get started.

## Device support

- last 2 versions of major devices
- internet explorer >= 9
- safari >= 7

[Browserlist support](http://browserl.ist/?q=last+2+versions%2C+safari+%3E%3D+7%2C+ie+%3E%3D+9)
