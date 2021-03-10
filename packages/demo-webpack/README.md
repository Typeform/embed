# Webpack Project Demo

If you use bundler such as webpack, you can include the embed library in your bundle:

```javascript
import { createWidget } from "@typeform/embed";

createWidget("<form id>", { container: document.querySelector("#container") });
```

Run `yarn build` in [embed package](../embed). Then run `yarn start` to run the demo in browser: http://localhost:8080
