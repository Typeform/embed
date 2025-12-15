#!/bin/sh

THIS_DIR="$(pwd)"
REPO_ROOT="${GITHUB_WORKSPACE:=$THIS_DIR}"
cd $REPO_ROOT
echo "Repo root directory: $(pwd)"

# setup git
echo "-- setup git"
git config --global user.email "you@example.com"
git config --global user.name "Github Action"

# release embed lib
echo "-- release embed lib"
cd $REPO_ROOT/packages/embed
yarn release-vanilla

# bump embed in embed-react
echo "-- bump embed in embed-react"
EMBED_VERSION=$(node -p "require('$REPO_ROOT/packages/embed/package.json').version")
echo "Latest @typeform/embed version: $EMBED_VERSION"
cd $REPO_ROOT/packages/embed-react
sed -i.bak "s/\"@typeform\/embed\": \".*\"/\"@typeform\/embed\": \"$EMBED_VERSION\"/" package.json && rm package.json.bak

# commit embed bump in embed-react
echo "-- commit embed bump in embed-react"
cd $REPO_ROOT
git add packages/embed-react
git commit -m 'feat: Bump @typeform/embed in @typeform/embed-react package [skip ci]'
git push https://$GITHUB_TOKEN@github.com/Typeform/embed.git

# release embed-react, will also commit all changes in embed-react including embed bump
echo "-- release embed-react lib, will also commit all changes in embed-react including embed bump"
cd $REPO_ROOT/packages/embed-react
yarn release

# bump embed and embed-react in demos
echo "-- bump embed and embed-react in demos"
EMBED_VERSION=$(node -p "require('$REPO_ROOT/packages/embed/package.json').version")
EMBED_REACT_VERSION=$(node -p "require('$REPO_ROOT/packages/embed-react/package.json').version")
echo "Latest @typeform/embed version: $EMBED_VERSION"
echo "Latest @typeform/embed-react version: $EMBED_REACT_VERSION"
cd $REPO_ROOT/packages/demo-nextjs
sed -i.bak "s/\"@typeform\/embed\": \".*\"/\"@typeform\/embed\": \"$EMBED_VERSION\"/" package.json && rm package.json.bak
sed -i.bak "s/\"@typeform\/embed-react\": \".*\"/\"@typeform\/embed-react\": \"$EMBED_REACT_VERSION\"/" package.json && rm package.json.bak

# commit embed and embed-react bumps in demo-nextjs
echo "-- commit embed and embed-react bumps in demo-nextjs"
cd $REPO_ROOT
git add packages/demo-nextjs
git commit -m 'chore: Bump @typeform/embed and @typeform/embed-react in demo-nextjs'
git push https://$GITHUB_TOKEN@github.com/Typeform/embed.git
