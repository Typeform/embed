# How to contribute

Thank you for contributing to the Typeform Embed software development kit (SDK)! We're glad you're here and grateful for your help.

This document describes how to set up the project locally, our development goals, and how to submit your changes in pull requests and send us your ideas and feedback.

## Local set up

Requirements:

- `node` >= 12
- `yarn`
- `java` >= 14 (to run visual tests)

To work with Embed as a developer:

1. [Fork](https://help.github.com/en/github/getting-started-with-github/fork-a-repo) this repository (https://github.com/Typeform/embed)
2. Clone your fork:
   ```bash
   $ git clone git@github.com:<your-github-username>/embed.git
   $ cd embed
   ```
3. Install dependencies
   ```bash
   $ yarn
   ```
4. Start server in dev mode and watch for changes:
   ```bash
   yarn start
   ```
5. Format and check your code:
   ```bash
   yarn prettier          # run prettier and write changes
   yarn lint              # run linter and check prettier formatting
   ```
6. Test your changes and format your code:
   ```bash
   yarn test              # run all tests: lint, unit, functional and visual tests
   yarn test:unit         # run unit tests
   yarn test:functional   # run functional tests
   yarn test:visual       # run visual tests (requires EYES_API_KEY env var for AppliTools)
   ```
7. Build project. Library is built and published when a pull request is merged to `master`.
   ```bash
   yarn build             # build project to ./dist and ./lib
   yarn clean             # delete directories with built files (./dist and ./lib)
   ```

## Development suggestions

<!-- TODO: add any "wishlist" items you hope someone might develop -->

We're always looking for new ways to embed the typeform, code samples and more.

If you have an idea for a community project, please [tell us about it](https://tfproductops.typeform.com/to/RGpsdc)!

## Submit your changes via pull request

Submit your changes via [GitHub pull request](https://help.github.com/articles/about-pull-requests/) to [/Typeform/embed](https://github.com/Typeform/embed/pulls) with a clear list of the changes you're making. Only one feature per commit.

Commit messages should follow the [angular project guidelines](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#commits). In short, your message needs to include:

- type (feat, fix, docs, style, refactor, perf, test, chore, revert)
- scope - uppercase JIRA ticket number goes here, you can leave it empty
- message
- body (optional)
- footer (for breaking change only)

Commit message example:

```
type(scope): Commit headline

Body of your commit message is optional. Explain your changes in detail here.
Can have multiple lines.

BREAKING CHANGE: This line should explain which changes. It is required onyl for commits with breaking change.
```

Each open pull request will be tested automatically [via Github Actions](./.github/workflows/test.yml).
It is recommended to run lint, unit & functional tests locally before opening a pull request.

## Send us feedback

[Send us feedback about the Embed SDK](https://tfproductops.typeform.com/to/RGpsdc). We can't wait to hear what you think!
