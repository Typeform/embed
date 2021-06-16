# ⚛ Typeform React Embed Library

Embed library for [React](https://reactjs.org/).

## Installation

Install as NPM package:

```shell
yarn add @typeform/embed-react
```

## Usage

Import the component you want to use. Then render it in your React app:

```javascript
import { Widget } from '@typeform/embed-react'

const MyComponent = () => {
  return <Widget id="<form-id>" style={{ width: '50%' }} className="my-form" />
}
```

Popup and slider components provide a button to open the embed:

```javascript
import { PopupButton } from '@typeform/embed-react'

const MyComponent = () => {
  return (
    <PopupButton id="<form-id>" style={{ fontSize: 20 }} className="my-button">
      click to open form in popup
    </PopupButton>
  )
}
```

You can render popover and slider anywhere in your app (preferably at the end of the page):

```javascript
import { Sidetab } from '@typeform/embed-react'

const MyComponent = () => {
  return <Sidetab id="<form-id>" buttonText="click to open" />
}
```

### How to get form id of your form?

You can find `<form-id>` from the public URL of your form:

- `https://form.typeform.com/to/<form-id>`

Or from admin panel URL:

- `https://admin.typeform.com/form/<form-id>/*`

## Configuration

### Options

Pass options as props to the component.

```javascript
<PopupButton
  id="<form-id>"
  size={60}
  hidden={{
    foo: 'Foo Value',
    bar: 'Bar Value',
  }}
  onReady={() => {
    console.log('form ready')
  }}
  enableSandbox
>
  click to open
</PopupButton>
```

See all available options in [Vanilla JavaScript Embed Library README file](../embed/README.md#options).

### Examples

You can find examples for specific use-cases with React in our demos:

- [React demo](../../packages/demo-react)
- [Next.js demo](../../packages/demo-nextjs)
