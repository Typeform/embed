import {
  makePopup,
  makeWidget,
  makeFullScreen
} from './lib'
import {
  getDataset,
  sanitizePopupAttributes,
  sanitizeWidgetAttributes
} from './core/attributes'
import { SIDE_PANEL } from './core/views/popup'

const onDOMReady = (callback) => {
  if (document.readyState !== 'loading') {
    callback()
  } else {
    document.addEventListener('DOMContentLoaded', callback)
  }
}

const initializePopup = (element) => {
  const url = element.getAttribute('href')
  const dataset = getDataset(element)
  const data = sanitizePopupAttributes(dataset)
  if (data.mode === SIDE_PANEL && !data.container) {
    data.container = element.parentNode
  }

  const popup = makePopup(url, data, element)

  element.onclick = (event) => {
    event.stopPropagation()
    popup.open(event)
    return false
  }
}

const initializeWidget = (element) => {
  const dataset = getDataset(element)
  const data = sanitizeWidgetAttributes(dataset)

  makeWidget(element, dataset.url, data)
}

// Make fullscreen runs on script execution instead of document.ready
// Then we avoid setting 'src' in the iframe that generates a reload
const iframe = document.getElementById('typeform-full')
if (iframe) {
  makeFullScreen(iframe, iframe.src, {})
}

onDOMReady(() => {
  // Doesn't load twice in case of double scripts
  if (window.typeformEmbedIsloaded) {
    return
  }

  window.typeformEmbedIsloaded = true

  // make popups
  const popupElements = document.getElementsByClassName('typeform-share')
  const popupElementsLength = popupElements.length

  for (let i = 0; i < popupElementsLength; i++) {
    initializePopup(popupElements[i])
  }

  // make widgets
  const widgetElements = document.getElementsByClassName('typeform-widget')
  const widgetElementsLength = widgetElements.length

  for (let i = 0; i < widgetElementsLength; i++) {
    initializeWidget(widgetElements[i])
  }
})

// Webpack configuration exposes this in window.typeformEmbed
// for users that load from S3 and use the API
export {
  makePopup,
  makeWidget,
  makeFullScreen
}
