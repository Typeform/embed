# 🛠📎 Typeform Clippy Vanilla Embed Library

**Typeform/embed** is the core embed library that lets you embed typeforms to your website using vanilla JavaScript.

## Clippy demo @ localhost

http://localhost:8080/clippy-html.html

## Installation

As HTML, the CSS is imported automatically. Place this code where you want to display your form.

```html
<div data-tf-popover="<form-id>" data-tf-clippy></div>
<script src="//embed.typeform.com/clippy/embed.js"></script>
```

Via JavaScript for more control and specific integration.

```html
<script src="//embed.typeform.com/clippy/embed.js"></script>
<link rel="stylesheet" href="//embed.typeform.com/clippy/css/popover.css" />
<script>
  window.tf.createPopover('<form-id>', { clippy: true })
</script>
```

NPM package not available (yet?).

# This is not the library you are looking for

You are most likely looking for [@typeform/embed](https://github.com/Typeform/embed/tree/main/packages/embed).
