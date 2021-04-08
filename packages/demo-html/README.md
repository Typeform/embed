# Static HTML Demo

Typeform can be embedded with 2 lines of code:

```html
<div data-tf-widget="<form id>"></div>
<script src="//embed.typeform.com/next/embed.js"></script>
```

For more control you can use provided javascript methods:

```html
<script src="//embed.typeform.com/embed-next.js"></script>
<link rel="stylesheet" href="//embed.typeform.com/css/popup.css" />
<script>
  const { open, close, toggle, refresh } = window.tf.createPopup("<form id>");
</script>
```

Run `yarn build` in [embed package](../embed). Then run `yarn start` in this package to run the demo in browser: http://localhost:8080
