---
title: Vanilla Embed Library
nav_title: Vanilla Embed Library
nav_order: 10
---

# Typeform Vanilla Embed Library

**[Typeform/embed](https://www.npmjs.com/package/@typeform/embed)** is the core embed library that lets you embed typeforms to your website using vanilla Javascript.

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

If you use the lib ss HTML, the CSS is imported automatically. Place this code where you want to display your form.

```html
<div data-tf-widget="<form-id>"></div>
<script src="//embed.typeform.com/next/embed.js"></script>
```

You can embed via JavaScript for more control and specific integration.

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

## Embed types

Embed typeform [inline in page](/embed/inline):
- widget: `createWidget('<form-id>', options)`

Embed typeform [in modal window](/embed/modal):
- popup: `createPopup('<form-id>', options)`
- slider: `createSlider('<form-id>', options)`
- sidetab: `createSidetab('<form-id>', options)`
- popover: `createPopover('<form-id>', options)`

`form-id` is string, you can find it in your typeform URL `https://form.typeform.com/to/<form-id>`

## What's next?

Learn how to embed typeform [inline in page](/embed/inline) or open it [in modal window](/embed/modal). Or, if your embedded typeform isn't displaying the way you expected, check [Troubleshooting and errors](/troubleshooting/#embed-sdk) for solutions.

If you want to create a form so you can embed it, sign up for a [Typeform](https://typeform.com) account or head to our documentation for the [Create API](/create/).

