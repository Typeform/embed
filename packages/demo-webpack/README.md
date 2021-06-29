# Webpack Project Demo

If you use bundler such as webpack, you can include the embed library in your bundle:

```javascript
import { createWidget } from '@typeform/embed'
import '@typeform/embed/build/css/widget.css'

createWidget('<form id>', { container: document.querySelector('#container') })
```

## Run demo locally

1. Run `yarn build` in repository root to build all packages
2. Then run `yarn start` here to run this demo in browser: http://localhost:8080
