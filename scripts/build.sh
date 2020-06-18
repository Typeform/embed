#!/bin/bash

# Build version with polyfills, ready to be used
# out-of-the-box
BUILD_STANDALONE=true bash -c 'yarn webpack'

# Build version without polyfills for advanced use cases
BUILD_STANDALONE=false bash -c 'yarn webpack'
