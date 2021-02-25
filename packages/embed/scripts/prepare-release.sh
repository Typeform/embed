#!/bin/sh

cd ./packages/embed
pwd
mkdir ./build-aws
ls -la ./build
mv ./build/embed-next.js ./build-aws/embed.js
mv ./build/css ./build-aws/
ls -la ./build-aws
