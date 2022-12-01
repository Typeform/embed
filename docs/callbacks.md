---
title: Vanilla Embed Library - Callbacks
nav_title: -- Callbacks
nav_order: 15
---

# Callback functions

You can listen to various events as the respondent is filling out the typeform on your page.

Available callbacks:

- **onReady** fires when the form is loaded
- **onSubmit** fires when user submits the form
- **onClose** fires when user closes the modal window
- **onQuestionChanged** fires when user navigates between form questions
- **onHeightChanged** fires when height of currently displayed question changes
- **onEndingButtonClick** fires when user clicks on the button on your typeform ending screen (it also disables the redirect functionality)

Each callback receives a payload object with `formId` to identify the typeform that sent the event.
Depending on the callback there might be more data in the payload - see examples below.

## onReady

The `onReady` callback will execute when the embedded typeform is fully loaded.

In JavaScript:

```javascript
import { createWidget } from '@typeform/embed'
import '@typeform/embed/build/css/widget.css'

createWidget('<form-id>', {
  onReady: ({ formId }) => {
    console.log(`Form ${formId} is ready`)
  },
})
```

Or in HTML:

```html
<div data-tf-widget="<form-id>" data-tf-on-ready="ready"></div>
<script src="//embed.typeform.com/next/embed.js"></script>
<script>
  // this function needs to be available on global scope (window)
  function ready({ formId }) {
    console.log(`Form ${formId} is ready`)
  }
</script>
```

## onSubmit

The `onSubmit` callback will execute immediately after a respondent successfully submits the typeform by clicking the "Submit" button.

The event is only sent for successful submissions. If a form has validation errors or the network connection is disrupted while the respondent is completing the form, the event is not sent.

You can make use of submitted response by using the information passed to `onSubmit` callback:

```javascript
import { createPopup } from '@typeform/embed'
import '@typeform/embed/build/css/popup.css'

createPopup('<form-id>', {
  onSubmit: ({ formId, responseId }) => {
    console.log(`Form ${formId} submitted, response id: ${responseId}`)
  },
})
```

Or in HTML:

```html
<button data-tf-popup="<form-id>" data-tf-on-submit="submit">open</button>
<script src="//embed.typeform.com/next/embed.js"></script>
<script>
  // this function needs to be available on global scope (window)
  function submit({ formId, responseId }) {
    console.log(`Form ${formId} submitted, response id: ${responseId}`)
  }
</script>
```

## onClose

The `onClose` callback will execute after a respondent closes the modal window the typeform is embedded in.

The event is sent regardless of whether the form submissions was successful.

In JavaScript

```javascript
import { createPopup } from '@typeform/embed'
import '@typeform/embed/build/css/popup.css'

createPopup('<form-id>', {
  onClose: ({ formId }) => {
    console.log(`Modal window with form ${formId} was closed`)
  },
})
```

Or in HTML:

```html
<button data-tf-popup="<form-id>" data-tf-on-close="close">open</button>
<script src="//embed.typeform.com/next/embed.js"></script>
<script>
  // this function needs to be available on global scope (window)
  function close({ formId }) {
    console.log(`Modal window with form ${formId} was closed`)
  }
</script>
```

To get a full response, you need to retrieve it via [Responses API](responses/reference/retrieve-responses/#retrieve-responses)

## onQuestionChanged

The `onQuestionChanged` callback will execute whenever respondent navigates between questions. The event is sent when navigating in the form forward or backward.

Payload contains `ref` to identify which question is displayed.

In JavaScript:

```javascript
import { createSlider } from '@typeform/embed'
import '@typeform/embed/build/css/slider.css'

createSlider('<form-id>', {
  onQuestionChanged: ({ formId, ref }) => {
    console.log(`Question in form ${formId} changed to ${ref}`)
  },
})
```

Or in HTML:

```html
<button data-tf-slider="<form-id>" data-tf-on-question-changed="changed">open</button>
<script src="//embed.typeform.com/next/embed.js"></script>
<script>
  // this function needs to be available on global scope (window)
  function changed({ formId, ref }) {
    console.log(`Question in form ${formId} changed to ${ref}`)
  }
</script>
```

## onHeightChanged

The `onHeightChanged` callback will execute whenever displayed question height changes - eg. when respondent navigates between questions, error message is displayed, etc.

Payload contains `ref` to identify which question is displayed and `height` with current height.

In JavaScript:

```javascript
import { createSlider } from '@typeform/embed'
import '@typeform/embed/build/css/slider.css'

createSlider('<form-id>', {
  onHeightChanged: ({ formId, ref, height }) => {
    console.log(`Question ${ref} in form ${formId} has height ${height}px now`)
  },
})
```

Or in HTML:

```html
<button data-tf-slider="<form-id>" data-tf-on-height-changed="changed">open</button>
<script src="//embed.typeform.com/next/embed.js"></script>
<script>
  // this function needs to be available on global scope (window)
  function changed({ formId, ref, height }) {
    console.log(`Question ${ref} in form ${formId} has height ${height}px now`)
  }
</script>
```

**Tip:** To automatically resize widget embed to fit typeform height, use `autoResize` option. You can specify minimum and maximum heights in pixels, eg. `data-tf-auto-resize="300,800"`.

## onEndingButtonClick

The `onEndingButtonClick` callback will execute whenever respondent clicks the button on ending screen in your typeform.
You can add custom functionality here, such as hide the form, navigate to another page or execute any other custom code.

When you add this callback to your embed, it will disable redirect functionality of the ending screen button.

In JavaScript:

```javascript
import { createSlider } from '@typeform/embed'
import '@typeform/embed/build/css/slider.css'

createSlider('<form-id>', {
  onEndingButtonClick: ({ formId }) => {
    console.log(`Ending button clicked in form ${formId}`)
  },
})
```

Or in HTML:

```html
<button data-tf-slider="<form-id>" data-tf-on-ending-button-click="clicked">open</button>
<script src="//embed.typeform.com/next/embed.js"></script>
<script>
  // this function needs to be available on global scope (window)
  function clicked({ formId }) {
    console.log(`Ending button clicked in form ${formId}`)
  }
</script>
```

## What's next?

Learn more about [contributing](/embed/contribute), or see what other open-source developers have created on the [Community projects](/community/) page.
