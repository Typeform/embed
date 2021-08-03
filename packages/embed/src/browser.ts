import {
  initializePopovers,
  initializePopups,
  initializeSidetabs,
  initializeSliders,
  initializeWidgets,
} from './initializers'

import * as lib from './index'

function loadEmbedElements(forceReload: boolean = false) {
  initializePopovers(forceReload)
  initializePopups(forceReload)
  initializeSidetabs(forceReload)
  initializeSliders(forceReload)
  initializeWidgets(forceReload)
}

const reload = () => loadEmbedElements(true)

const load = () => loadEmbedElements(false)

module.exports = {
  ...lib,
  load,
  reload,
}

document.addEventListener('DOMContentLoaded', load, false)
