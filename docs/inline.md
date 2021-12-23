---
title: Vanilla Embed Library - Inline embed
nav_title: -- Inline embed
nav_order: 11
---

# Embed typeform inline in page

With the **widget embed type**, you can embed your typeform in a DOM element on your website or web app. You can control the size of your typeform by setting size of the parent element and the typeform will fill it.

To embed as a widget via JavaScript:

```javascript
import { createWidget } from '@typeform/embed'
import '@typeform/embed/build/css/widget.css'

createWidget('<form-id>', { container: document.querySelector('#form') })
```

Or via HTML:

```html
<div data-tf-widget="<form-id>"></div>
<script src="//embed.typeform.com/next/embed.js"></script>
```

## Seamless inline embed

To make your typeform fit seamlessly into your website or web application, embed your typeform in a DOM element on the page, hide the header and footer, and set the background opacity at `0`.

Via JavaScript:

```javascript
import { createWidget } from '@typeform/embed'
import '@typeform/embed/build/css/widget.css'

createWidget('<form-id>', {
  container: document.querySelector('#form'), // you need an element with 'form' id
  hideHeaders: true,
  hideFooter: true,
  opacity: 0,
})
```

Or via HTML:

```html
<div data-tf-widget="<form-id>" data-tf-hide-headers data-tf-hide-footer data-tf-opacity="0" id="form"></div>
<script src="//embed.typeform.com/next/embed.js"></script>
```

## Fullscreen embed

You can embed the form full-screen by setting correct size for the container element via CSS.

Via HTML:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Static HTML Demo</title>
    <style>
      * {
        margin: 0;
        padding: 0;
      }
      html,
      body {
        width: 100%;
        height: 100%;
      }
      #form {
        width: 100%;
        height: 100%;
      }
    </style>
  </head>
  <body>
    <div id="form" data-tf-widget="<form-id>"></div>
    <script src="//embed.typeform.com/next/embed.js"></script>
  </body>
</html>
```

If you want to embed full-page via JavaScript you can use the same CSS as above and use `createWidget` method from `@typeform/embed`.

## Examples

You can find [live editable examples in the embed-demo repository](https://github.com/Typeform/embed-demo).

## What's next?

Learn how to [open typeform in modal window](/embed/modal) or see [configuration options](/embed/configuration).

Or, if your embedded typeform isn't displaying the way you expected, check [Troubleshooting and errors](/troubleshooting/#embed-sdk) for solutions.
