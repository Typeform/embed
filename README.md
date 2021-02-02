# 📦 Typeform Embed Libraries

This is a monorepo for all embed libraries.

Packages:

- [Vanilla Embed Library](./packages/embed)
- [React Embed Library](./packages/embed-react)

## Development

Make sure dependencies are in sync by running this in monorepo root:

```bash
yarn lerna link convert
yarn install
```

It will [sync local packages and move `devDepencies` to root](https://github.com/lerna/lerna#common-devdependencies).
