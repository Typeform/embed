import {
  initializePopovers,
  initializePopups,
  initializeSidetabs,
  initializeSliders,
  initializeWidgets,
  initializeLiveEmbeds,
} from './initializers'

import * as lib from './index'

function loadEmbedElements(forceReload: boolean = false) {
  initializeEmbedElements({ forceReload })
  initializeLiveEmbeds({
    forceReload,
    onLiveEmbedLoad: (container) => {
      initializeEmbedElements({ container, forceReload })
    },
  })
}

function initializeEmbedElements(initProps: { container?: HTMLElement; forceReload: boolean }) {
  initializePopovers(initProps)
  initializePopups(initProps)
  initializeSidetabs(initProps)
  initializeSliders(initProps)
  initializeWidgets(initProps)
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
