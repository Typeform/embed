---
title: Embed SDK
nav_title: Embed SDK
---

# Embed SDK

When you build your typeform, we generate a unique URL that anyone can access from any device. All you have to do is share the link and wait for responses to roll in. But what if your audience is used to interacting with you on your website? You can make it as easy as possible for people to access your typeform by **embedding** it!

The Embed library is a client-side script and [CommonJS module](https://webpack.js.org/api/module-methods/#commonjs) that you can use to embed your typeforms in your website or web application.

---

Did you know embed library is [open-source and open to contributions](/embed/contributing)?

---

## Key Concepts

Embedded typeforms appear on your website or web application. Embedded typeforms look like they're a part of your website, and people won't have to leave your site or page to complete your typeform.

You have multiple options for embedding a typeform:

- embed it directly in a web page (inline or full page),
- launch it in a popup or slider,
- unobtrusive popover or side tab.

The Embed SDK exposes an API that lets you create and customize the widget or popup that embeds your typeform. You'll use the SDK in your webpage or web application code to specify which typeform to embed and the features you want to apply.

## Requirements

To create your own typeforms to embed, you need a Typeform account. Head to [www.typeform.com](https://www.typeform.com) to register. You can create typeforms with the Typeform admin panel or the [Create API](/create/).

## Limitations

For security purposes we prevent embedding typeorms in unsecure pages (via [CSP headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)).
You can embed your typeform on pages served over HTTPS or via HTTP on localhost. You can also [embed in wrapped progressive web apps](https://developer.typeform.com/embed/native-mobile-apps/).

## Supported browsers

We support all modern browsers on most used platforms. You can [see list of supported browsers here](https://help.typeform.com/hc/en-us/articles/360029423551-FAQ).

---

**NOTE:** If you're not comfortable with front-end development, use the instructions in [this Help Center article](https://www.typeform.com/help/embed-a-typeform/) to embed with a code snippet instead.

---

### Typeform Embed SDK for specific framework

We are constantly trying to improve developer experience. Which framework would you like us to support next? [Vote for the next framework in this typeform.](https://survey.typeform.com/to/QrC0uX2f)
