# Embed [![Build Status](https://travis-ci.com/Typeform/embed.svg?token=saUfE8snB8FHYR1EzFaL&branch=master)](https://travis-ci.com/Typeform/embed) [![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/) [![npm](https://img.shields.io/npm/dm/localeval.svg)](https://www.npmjs.com/package/@Typeform/embed)

**Typeform/embed** is the client-side script and a [CommonJS module](http://webpack.github.io/docs/commonjs.html) that allows you to integrate a typeform into your website easily.

This README file contains instructions to embed typeform into your website. If you are looking to set up the project locally for development and contribution, see [CONTRIBUTING.md](CONTRIBUTING.md).

If you are not comfortable with frontend development you can [embed typeform via code snippets](https://www.typeform.com/help/embed-a-typeform/)

## Getting Started

Requirements:
* `node` >= 12
* `yarn` (or `npm`)

### Installation

We recommend to use `yarn` as your package manager, and also a build tool like webpack or browserify in order to use it.

```bash
yarn add @typeform/embed
```

If you're not, you can still use it with our [CDN](https://embed.typeform.com/embed.js):

```html
<script src="https://embed.typeform.com/embed.js"></script>
<!-- this script exposes the API to `window.typeformEmbed` -->
```

### Usage

```js
// Using ES6 imports
import * as typeformEmbed from '@typeform/embed'
// or require
const typeformEmbed = require('@typeform/embed')
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

  | option         | description                                                                                                                                                    | values     | default |
  |----------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------|------------|---------|
  | opacity        | You can make your typeform's background totally transparent, or opaque. (For example, to have a video as a background)                                         | `Number`   | 100     |
  | buttonText     | The button text that appears on mobile in order to open the typeform.                                                                                          | `String`   | "Start" |
  | hideScrollbars | Hide fixed scrollbars.                                                                                                                                         | `Boolean`  | false   |
  | hideFooter     | Hide typeform footer, that appears showing the progress bar and the navigation buttons.                                                                        | `Boolean`  | false   |
  | hideHeaders    | Hide typeform header, that appears when you have a Question group, or a long question that you need to scroll through to answer, like a Multiple Choice block. | `Boolean`  | false   |
  | onSubmit       | Callback function that will be executed right after the typeform is successfully submitted.                                                                    | `Function` | -       |
  | onReady       | Callback function that will be executed once the typeform is ready.                                                                                             | `Function` | -       |

  #### Example:

  ```js
  // Here we are getting an existing element on your HTML
  const embedElement = document.querySelector('.js-typeform-embed')

  typeformEmbed.makeWidget(
    embedElement,
    'https://admin.typeform.com/to/PlBzgL',
    {
      opacity: 55,
      buttonText: "Answer this!",
      hideScrollbars: true,
      onSubmit: function () {
        console.log('Typeform successfully submitted')
      },
      onReady: function () {
        console.log('Typeform is ready')
      }
    }
  )
  ```

### Popup

Use a popup to embed the typeform in a modal window.

```js
typeformEmbed.makePopup(url, options)
```

- **url**: typeform's URL (like: `https://admin.typeform.com/to/PlBzgL`)
- **options**: Object with the optional parameters:

  | option         | description                                                                                                                                                    | values                                                                        | default |
  |----------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------|---------|
  | mode           | ![typeform Embed Popup modes](/documentation/popup.png) <br/> The way of showing the embed                                                                     | `String` any of: <br/> `"popup"` <br/> `"drawer_left"` <br/> `"drawer_right"` | "popup" |
  | autoOpen       | Your typeform will launch as soon as your web page is opened                                                                                                   | `Boolean`                                                                     | false   |
  | autoClose      | Time until the embedded typeform will automatically close after a respondent clicks the Submit button. The default time is 5 seconds. PRO+ users can change the `autoClose` time. | `Number` (seconds)                                                        | -       |
  | hideScrollbars | Hide fixed scrollbars.                                                                                                                                         | `Boolean`                                                                     | false   |
  | hideFooter     | Hide typeform footer, that appears showing the progress bar and the navigation buttons.                                                                        | `Boolean`                                                                     | false   |
  | hideHeaders    | Hide typeform header, that appears when you have a Question group, or a long question that you need to scroll through to answer, like a Multiple Choice block. | `Boolean`                                                                     | false   |
  | drawerWidth    | Specify the width of the drawer (only applies if using `mode` `"drawer_left"` or `"drawer_right"`).                                                             | `Number` (pixels)                                                            | 800     |
  | onSubmit       | Callback function that will be executed right after the typeform is successfully submitted.                                                                    | `Function`                                                                    | -       |
  | onReady        | Callback function that will be executed once the typeform is ready.                                                                                            |
  `Function`                                                                    | -       |
  | onClose        | Callback function that will be executed once the typeform is closed.                                                                                            |
  `Function`                                                                    | -       |

  #### Example:

  ```js
  typeformEmbed.makePopup(
    'https://admin.typeform.com/to/PlBzgL',
    {
      mode: 'drawer_left',
      autoOpen: true,
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
      }
    }
  )
  ```

## Troubleshooting

### An element in my page is over the typeform
For the modal modes (popup, drawer and mobile), we use a z-index of 1000 by default. Take this into account when you want an element to be over or under the typeform modal.

### When loading a typeform in mobile, a screen with the typeform name and a 'Start' button appears before the typeform
To get the best experience, on mobile all embedded typeforms are oppened in a fullscreen modal. The popup type behaves as expected, but a widget on mobile has an additional screen to launch the modal. This screen includes the typeform title and a button to lanch the typeform itself.

If you want to override this behaviour, the best option is to use the API with `makePopup` to open the typeform modal when you decide.

### After opening a typeform in mobile, a `<meta name="viewport">` tag is added to the document
This tag is needed for the correct visualization of the typeform. This is only a problem if you don't have this tag in your site.

### Transparency is not applied on mobile
We do not apply transparency on modals, and all embed types behave like a modal in mobile.

### Typeform does not look good with a small embed
Although we have no hard limit, we recommend having a height of at least 350px.

### Typeform not visible after pressing 'Start' in mobile
We use `position: fixed` to position our modal relative to its containing block established by the viewport. If one of the modal ancestors has a `transform`, `perspective`, or `filter` css property set to something other than `none` the positioning will be relative to it and probably not visible by the user.

## Tests
In order to run visual tests, you need an applitools key.
- Add a `.env` file in your root, you can look at the `.env.example`
- Add your api key `EYES_API_KEY=HERE_GOES_YOUR_KEY`
- (Optional) You can add the url, by default the url is `http://localhost:8080`
- Start the server `yarn start`
- Run the tests with `yarn test`
- - This command will run all the tests. That means **unit tests**, **integration tests** and **visual tests**

This is the list of all the test commands, if you want to run them one by one:
- `yarn test:unit`  --> Runs unit tests
- `yarn test:functional` --> Runs cross browser functional tests with Cypress
- `yarn test:visual` --> Runs visual tests with CodeceptJs, WebDriver, and Applitools.
- `yarn test:visual:chrome` --> Runs visual tests using Chrome
- `yarn test:visual:firefox` --> Runs visual tests using Firefox (Gecko drivers)

## Feedback

We are always open to your [feedback](https://tfproductops.typeform.com/to/RGpsdc).

## Contribution

We'd love to have your helping hand on typeform's embed. See [CONTRIBUTING.md](CONTRIBUTING.md) for more information on what we're looking for and how to get started.

## Device support

- last 2 versions of major devices
- internet explorer >= 9
- safari >= 7

[Browserlist support](http://browserl.ist/?q=last+2+versions%2C+safari+%3E%3D+7%2C+ie+%3E%3D+9)
