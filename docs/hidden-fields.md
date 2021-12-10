---
title: Vanilla Embed Library - Hidden Fields
nav_title: -- Hidden Fields
nav_order: 14
---

# Use Hidden Fields in embedded typeforms

You can [Hidden Fields](https://help.typeform.com/hc/en-us/articles/360050448072-Hidden-fields-explained) to pass information to a typeform embedded on your site.

-----

**NOTE:** You are responsible for any information you share with Hidden Fields. Recording and transmitting identifying information, like email addresses, is prohibited by some services (like Google Analytics). Make sure that the way you use Hidden Fields stays within the laws of your country and the terms and conditions of any service you are using with Typeform.

-----

Hidden Fields are key-value pairs of information you already know about your respondents. You can use the information you already know about respondents to customize your typeform — for example, to greet respondents by name or ask certain questions for respondents in a specific age group. Or, you can tie the information you already know with the new data you collect in the typeform — for example, to gather more information about an individual respondent.

Values for Hidden Fields come from the parameters you add to your typeform's URL, not from information respondents enter in the Typeform. You can manually add Hidden Fields to the URL before sharing it or use your customer relationship management system (like Salesforce) to populate Hidden Fields data. In either case, you'll configure Hidden Fields when you create your typeform.

## Pass hidden field values

When you embed a typeform you need pass hidden fields into the embed itself. It will take care of passing the values correctly in typeform URL.

In JavaScript:
```javascript
import { createWidget } from '@typeform/embed'
import '@typeform/embed/build/css/widget.css'

createWidget("moe6aa", {
  container: document.getElementById("wrapper"),
  hidden: {
    full_name: "John Doe",
    email: "john@example.com"
  },
})
```

Or via HTML:
```html
<div
  data-tf-widget="<form-id>"
  data-tf-hidden="full_name=John Doe,email=john@example.com"
></div>
<script src="//embed.typeform.com/next/embed.js"></script>
```

## Pass values from host page URL

You can also configure the embed to read hidden field values from the host page query parameters. 

In JavaScript:
```javascript
import { createWidget } from '@typeform/embed'
import '@typeform/embed/build/css/widget.css'

createWidget("moe6aa", {
  container: document.getElementById("wrapper"),
  transitiveSearchParams: ["full_name", "email"],
})
```

Or via HTML:
```html
<div
  data-tf-widget="<form-id>"
  data-tf-transitive-search-params="full_name,email"
></div>
<script src="//embed.typeform.com/next/embed.js"></script>
```

The typeform will load values from query params of you page where you embedded it. For example if your typeform is embedded at `https://example.com/embed.html`, you can use a URL with query params like this:

```
https://example.com/embed.html?full_name=John%20Doe&email=john%40example.com&age=18
```

The embed will pass hidden fields `full_name` and `email` to the typeform. Query param `age` will be ignored.


## What's next?

Read more about [how to pass callbacks](/embed/callbacks).

Or check out what other open-source developers have created on the [Community projects](/community/) page.

