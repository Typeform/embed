---
title: Vanilla Embed Library - Modal embeds
nav_title: -- Modal embeds
nav_order: 12
---

# Open typeform in modal window

You can embed typeform in a modal window. The modal window will be displayed over your website. It is ussually opened by user action such as clicking the button.

There are multiple modal embeds available:
- popup
- slider
- sidetab
- popover

## Popup

To embed as a popup via JavaScript:

```javascript
import { createPopup } from '@typeform/embed'
import '@typeform/embed/build/css/popup.css'

const { toggle } = createPopup("<form-id>")
document.getElementById("button").onclick = toggle
```

Or via HTML:
```html
<button data-tf-popup="<form-id>">open form</button>
<script src="//embed.typeform.com/next/embed.js"></script>
```

## Other modal embeds

If you want to use a different modal embed type use one of the methods below. 

Slider:

```javascript
import { createSlider } from '@typeform/embed'
import '@typeform/embed/build/css/slider.css'
createSlider('<form-id>', options)
```

```html
<a data-tf-slider="<form-id>">...</a>
```

Side tab:

```javascript
import { createSidetab } from '@typeform/embed'
import '@typeform/embed/build/css/sidetab.css'
createSidetab('<form-id>', options)
```

```html
<a data-tf-sidetab="<form-id>">...</a>
```

Popover:

```javascript
import { createPopover } from '@typeform/embed'
import '@typeform/embed/build/css/popover.css'
createPopover('<form-id>', options)
```

```html
<a data-tf-popover="<form-id>">...</a>
```

## Examples

You can find [working examples in the repository](https://github.com/Typeform/embed/tree/main/packages/demo-html).

## What's next?

Learn about using [hidden fields](/embed/hidden-fields) or see [configuration options](/embed/configuration).

Or, if your embedded typeform isn't displaying the way you expected, check [Troubleshooting and errors](/troubleshooting/#embed-sdk) for solutions.
