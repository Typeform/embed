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
  const { open, close, toggle, refresh } = window.tf.createPopup('<form id>')
</script>
```

## Run demo locally

1. Run `yarn build` in repository root to build all packages
2. Then run `yarn start` here to run this demo in browser: http://localhost:8080
