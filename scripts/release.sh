#!/bin/sh

THIS_DIR="$(pwd)"
REPO_ROOT="${GITHUB_WORKSPACE:=$THIS_DIR}"
cd $REPO_ROOT
echo "Repo root directory: $(pwd)"

# Setup git
git config --global user.email "you@example.com"
git config --global user.name "Github Action"

# release vanilla lib
cd $REPO_ROOT/packages/embed
yarn release-vanilla

# bump vanilla lib
cd $REPO_ROOT/packages/embed-react
yarn upgrade @typeform/embed

# release react lib, will also commit all changes in react lib including vanilla lib bump
cd $REPO_ROOT/packages/embed-react
yarn release

# bump vanilla and react libs in demos
cd $REPO_ROOT/packages/demo-nextjs
yarn upgrade @typeform/embed
yarn upgrade @typeform/embed-react

cd $REPO_ROOT/packages/demo-react
yarn upgrade @typeform/embed-react

cd $REPO_ROOT/packages/demo-webpack
yarn upgrade @typeform/embed

# commit vanilla and react lib bumps in demos
cd $REPO_ROOT
git add packages/demo-*
git commit -m 'chore: Bump @typeform/embed and @typeform/embed-react in demo packages'
git push origin
