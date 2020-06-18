#!/bin/bash

# Copy demo folder content to dist/
cp -a ./demo/. ./dist
# Remove embed.js symlink
rm -rf ./dist/embed.js
# Copy library build output to dist/
cp -a ./build/. ./dist
