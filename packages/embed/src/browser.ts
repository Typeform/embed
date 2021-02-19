import { initializePopovers, initializePopups, initializeWidgets } from './initializers'

import * as tf from './index'

module.exports = tf

function loadEmbedElements() {
  initializePopovers()
  initializePopups()
  initializeWidgets()
}

document.addEventListener('DOMContentLoaded', loadEmbedElements, false)
