import {
  initializePopovers,
  initializePopups,
  initializeSidetabs,
  initializeSliders,
  initializeWidgets,
  initializeSingleEmbeds,
} from './initializers'

import * as lib from './index'

function loadEmbedElements(forceReload: boolean = false) {
  initializeEmbedElements(forceReload)
  initializeSingleEmbeds(forceReload).then(() => {
    initializeEmbedElements(forceReload)
  })
}

function initializeEmbedElements(forceReload: boolean) {
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

if (document.readyState === 'interactive' || document.readyState === 'complete') {
  load()
}
