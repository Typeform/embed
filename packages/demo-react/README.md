# React App Demo

Typeform can be embedded in React apps using [@typeform/embed-react](../embed-react):

```javascript
import { Widget } from "@typeform/embed-react";

export const MyComponent = () => {
  return <Widget id="<form-id>" style={{ width: "50%" }} className="my-form" />;
};
```

## Run demo locally

1. Run `yarn build` in repository root to build all packages
2. Then run `yarn start` here to run this demo in browser: http://localhost:8080
