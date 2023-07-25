---
title: Embed SDK - Custom embeds
nav_title: Custom embeds
nav_order: 50
---

# Custom embeds

Although it is possible to embed a typeform by adding an iframe in your page that points to a typeform, we encourage you to use the [Embed SDK](https://developer.typeform.com/embed/). Custom embeds often cause issues like:

- Scrolling problems in older browsers.
- Autofocus "jumps" to the first focusable question.
- User interface flow problems on mobile devices.
- General errors that can break functionality and the user experience.

We do not support or recommend custom embeds, but if you want to still use it, we recommend following the oembed endpoint linked in the form page.
Also, if you have custom logic for recognizing typeform URLs, you should add support not only for `typeform.com`, but consider also `eu.typeform.com`.
