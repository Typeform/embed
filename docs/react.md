---
title: React Embed Library
nav_title: React Embed Library
nav_order: 20
---

# Typeform React Embed Library

**[Typeform/embed-react](https://www.npmjs.com/package/@typeform/embed-react)** is Typeform official embed library to embed typeforms in your [React](https://reactjs.org/) project.

## Installation

Add the library to your project using your favourite package manager:

```shell
yarn add @typeform/embed-react
```

or

```shell
npm install @typeform/embed-react --save
```

## Usage

Import the component you want to use. Then render it in your React app.

For example to embed your typeform as a `Widget`.

```javascript
import { Widget } from '@typeform/embed-react'

const MyComponent = () => {
  return <Widget id="<form-id>" style={{ width: '50%' }} className="my-form" />
}
```

The `PopupButton` and `SliderButton` components provide a button to open the embed:

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

You can render `Popover` and `Slider` components anywhere in your app (preferably at the end of the page):

```javascript
import { Sidetab } from '@typeform/embed-react'

const MyComponent = () => {
  return <Sidetab id="<form-id>" buttonText="click to open" />
}
```

## How to get form id of your form?

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

## What's next?

Learn more about [Vanilla Embed Library](/embed/vanilla). Since React Embed Library is just a React wrapper for Vanilla Embed Library, all concepts apply here as well.

You can:
- embed typeform [inline in page](/embed/inline) 
- open it [in modal window](/embed/modal)
- see all available [configuration options](/embed/configuration)

If you want to create a form so you can embed it, sign up for a [Typeform](https://typeform.com) account or head to our documentation for the [Create API](/create/).

