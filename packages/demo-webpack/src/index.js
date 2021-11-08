import { createWidget, createPopup } from '@typeform/embed'

import { makePage } from './make-page'
import { makeNavigation } from './make-navigation'

import './style.css'
import '@typeform/embed/build/css/popup.css'
import '@typeform/embed/build/css/widget.css'

const root = document.querySelector('#root')

const menu = document.createElement('div')
menu.className = 'menu'
root.append(menu)

const content = document.createElement('div')
content.id = 'content'
root.append(content)

const widget = document.createElement('div')
widget.id = 'widget'
createWidget('HLjqXS5W', { container: widget })

const { open } = createPopup('HLjqXS5W')
const popupButton = document.createElement('button')
popupButton.id = 'popup'
popupButton.innerHTML = 'Open Popup'
popupButton.onclick = open

const widgetPage = document.createElement('div')
makePage(widgetPage, 'Hello Widget via Webpack', 'Hello from Typeform widget 👋', widget)

const popupPage = document.createElement('div')
makePage(popupPage, 'Hello Popup via Webpack', 'Hello from Typeform popup 💬', popupButton)

menu.append(makeNavigation('widget', widgetPage))
menu.append(makeNavigation('popup', popupPage))
