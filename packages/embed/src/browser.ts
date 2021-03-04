import {
  initializePopovers,
  initializePopups,
  initializeSidetabs,
  initializeSliders,
  initializeWidgets,
} from './initializers'

import * as tf from './index'

module.exports = tf

function loadEmbedElements() {
  initializePopovers()
  initializePopups()
  initializeSidetabs()
  initializeSliders()
  initializeWidgets()
}

document.addEventListener('DOMContentLoaded', loadEmbedElements, false)
