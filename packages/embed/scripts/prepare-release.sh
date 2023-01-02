#!/bin/sh

REPO_ROOT="${GITHUB_WORKSPACE:=.}"

cd $REPO_ROOT/packages/embed
pwd

rm -rf ./build-aws
mkdir ./build-aws

echo 'ls -la ./build'
ls -la ./build

cp ./build/embed.js ./build-aws/embed.js
cp -r ./build/css ./build-aws/

echo 'ls -la ./build-aws'
ls -la ./build-aws
