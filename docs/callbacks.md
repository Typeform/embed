---
title: Vanilla Embed Library - Callbacks
nav_title: -- Callbacks
nav_order: 15
---

# Callback functions

You can listen to varios events as the respondent is filling out the typeform on your page.

There are 3 available callbacks:

- **onReady** fires when the form is loaded
- **onSubmit** fires when user submits the form
- **onQuestionChanged** fires when user navigates between form questions

## onReady

The `onReady` callback will execute when the embedded typeform is fully loaded.

In JavaScript:

```javascript
import { createWidget } from '@typeform/embed'
import '@typeform/embed/build/css/widget.css'

createWidget("<form-id>", {
  onReady: () => {
    console.log('Form is ready!')
  },
})
```

Or in HTML:

```html
<div
  data-tf-widget="<form-id>"
  data-tf-on-ready="ready"
></div>
<script src="//embed.typeform.com/next/embed.js"></script>
<script>
  function ready() { // this needs to be available on global scope (window) 
    alert('Form is ready!')
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

createPopup("<form-id>", {
  onSubmit: (event) => {
    console.log(event.response_id)
  },
})
```

Or in HTML:

```html
<div
  data-tf-popup="<form-id>"
  data-tf-on-submit="submit"
></div>
<script src="//embed.typeform.com/next/embed.js"></script>
<script>
  function submit(event) { // this needs to be available on global scope (window)
    console.log(event.response_id)
  }
</script>
```


To get a full response, you need to retrieve it via [Responses API](responses/reference/retrieve-responses/#retrieve-responses)

## onQuestionChanged

The `onQuestionChanged` callback will execute whenever respondent navigates between questions. The event is sent when navigating in the form forward or backward.

At the moment it is not possible to identify which question is displayed to respondent.

In JavaScript:

```javascript
import { createSlider } from '@typeform/embed'
import '@typeform/embed/build/css/slider.css'

createSlider("<form-id>", {
  onQuestionChanged: () => {
    console.log('Question changed')
  },
})
```

Or in HTML:

```html
<div
  data-tf-slider="<form-id>"
  data-tf-on-quesion-changed="changed"
></div>
<script src="//embed.typeform.com/next/embed.js"></script>
<script>
  function changed() { // this needs to be available on global scope (window)
    console.log('Question changed')
  }
</script>
```

## What's next?

Learn more about [contributing](/embed/contribute), or see what other open-source developers have created on the [Community projects](/community/) page.
