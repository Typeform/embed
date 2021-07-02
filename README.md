# 📦 Typeform Embed Libraries

This is a monorepo for all embed libraries.

# Libraries

Pick a library you want to use:

- [React Embed Library](./packages/embed-react) if you are building an app in React **✨ NEW**
- [Vanilla JavaScript Embed Library](./packages/embed) if you are not using React

Support for other libraries coming later. [You can help us if you want 😉](#contribution)

If you need documentation for previous version of embed lib (version 0) [see old README here](https://github.com/Typeform/embed/tree/master#readme).

# Demos

We have demo projects to show how the libraries work:

- [HTML](./packages/demo-html)
- [Webpack](./packages/demo-webpack)
- [React](./packages/demo-react)
- [Next.js](./packages/demo-nextjs)

## Contribution

Do you need a specific feature in embed library? Do you think others might benefit from it as well? Do you want to create embed library for another library? This is a section for you! We appreciate your help.

[Fork and clone](https://docs.github.com/en/github/getting-started-with-github/fork-a-repo) this Github repo: https://github.com/Typeform/embed

We recommend you to [open an issue first](https://github.com/Typeform/embed/issues) and discuss your proposed change. Then you can submit your changes [through a pull request](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/about-pull-requests) to this repo.

Before you do, make sure your code works on your local machine:

```bash
yarn install
yarn build
yarn lint
yarn test
yarn test:functional
yarn test:visual
```

For details see README for specific library.

Then you can open a new pull request: https://github.com/Typeform/embed/pulls
