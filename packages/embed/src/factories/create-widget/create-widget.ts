import {
  createIframe,
  hasDom,
  isFullscreen,
  unmountElement,
  lazyInitialize,
  makeAutoResize,
  changeColorOpacity,
} from '../../utils'
import {
  getFormHeightChangedHandler,
  getFormThemeHandler,
  getWelcomeScreenHiddenHandler,
} from '../../utils/create-iframe/get-form-event-handler'
import { clippy } from '../../clippy'
import { waitForElement } from '../../utils/wait-for-element'

import { WidgetOptions } from './widget-options'
import { buildWidget } from './elements'

window.clippy = clippy

type Clippy = {
  load: () => void
}

declare global {
  var clippy: Clippy
}

export type Widget = {
  refresh: () => void
  unmount: () => void
}

const buildCloseButton = () => {
  const closeButton = document.createElement('a')
  closeButton.className = 'tf-v1-widget-close tf-v1-close-icon'
  closeButton.innerHTML = '&times;'
  return closeButton
}

export const createWidget = (formId: string, options: WidgetOptions): Widget => {
  if (!hasDom()) {
    return {
      refresh: () => {},
      unmount: () => {},
    }
  }

  const widgetOptions = { ...options }

  let clippyInstance = {
    stop: () => {},
    animate: () => {},
    play: (_v: string) => {},
    gestureAt: (_x: number, _y: number) => {},
  }

  if (options.clippy) {
    options.container.innerHTML =
      ' <div class="window-wrapper"> <div class="window"> <div class="window-border"> <div class="title-bar h-count"> <div class="control-box"> <a class="button-3d minimize"><span>&nbsp;</span></a> <a class="button-3d maximize"><span>&nbsp;</span></a> <a class="button-3d close"><span>&nbsp;</span></a> </div><span class="title"> Typeform - Microsoft Word </span> </div><div class="menu-bar h-count"> <a><span>F</span>ile</a> <a><span>E</span>dit</a> <a><span>V</span>iew</a> <a><span>I</span>nsert</a> <a>F<span>o</span>rmat</a> <a><span>T</span>ools</a> <a>T<span>a</span>ble</a> <a><span>W</span>indow</a> <a><span>H</span>elp</a> <div class="clear"></div></div><div class="toolbar float-left"> <a class="b-new"></a> <a class="b-open"></a> <a class="b-save"></a> <span class="sep"></span> <a class="b-print"></a> <a class="b-spell"></a> <span class="sep"></span> <a class="b-copy"></a> <a class="b-paste"></a> <span class="sep"></span> <a class="b-undo" data-cmd="undo"></a> <a class="b-redo" data-cmd="redo"></a> <div class="clear"></div></div><div class="toolbar float-left"> <a class="b-style"></a> <div class="picker"><span class="arrow"></span>Normal</div><div class="picker"><span class="arrow"></span>Times New Roman</div><div class="picker"><span class="arrow"></span>12</div><span class="sep"></span> <a class="b-bold" data-cmd="bold"></a> <a class="b-italic" data-cmd="italic"></a> <a class="b-underline" data-cmd="underline"></a> <span class="sep"></span> <a class="b-left" data-cmd="justifyLeft"></a> <a class="b-center" data-cmd="justifyCenter"></a> <a class="b-right" data-cmd="justifyRight"></a> <div class="clear"></div></div><div class="toolbar float-right social h-count"> <a class="b-share text" href="https://www.facebook.com/sharer.php?u=https://windows95.typeform.com" target="_blank"><span>Share</span><em id="fb-count">0</em></a> <a class="b-tweet text" href="https://twitter.com/share?url=https://windows95.typeform.com&amp;via=Typeform&amp;text=Use Typeform together with a Clippy embed for instant nostalgia." target="_blank"><span>Tweet</span><em id="tweet-count"></em></a> <div class="clear"></div></div><div class="clear"></div><div class="content"> <div class="content-box"> <div class="top-ruler h-count"> <div class="ruler"></div></div><div class="left-ruler"></div><div class="document-scroller"> <div class="document-content"> <div class="document container" id="the-form"> </div></div></div></div></div><div class="status-bar h-count"> <div class="status-bar-content"> <span class="box"> Page 1 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Sec 1 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 1/1 &nbsp;&nbsp;&nbsp;&nbsp; </span> <span class="box"> At 1" &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Ln 1 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Col 1 &nbsp;&nbsp;&nbsp;&nbsp; </span> <span class="box disabled"> REC </span> <span class="box disabled"> TRK </span> <span class="box disabled"> EXT </span> <span class="box disabled"> OVR </span> </div></div></div></div></div>'
    options.container = options.container.querySelector('#the-form') as HTMLElement

    if (options.clippy) {
      ;(clippy as any).load('Clippy', async (agent) => {
        agent.show()
        agent.moveTo(window.innerWidth - 200, 400)
        clippyInstance = agent
        const clipyElm = (await waitForElement('.clippy')) as HTMLElement
        clipyElm.onclick = () => {
          clippyInstance.animate()
        }
      })
    }

    setInterval(() => {
      if (clippyInstance) {
        const x = window.innerWidth / 2
        const y = window.innerHeight / 2
        clippyInstance.gestureAt(x, y)
      }
    }, 10_000)
  }

  const blockAnimations = {
    default: 'GetWizardy',
  }

  widgetOptions.onQuestionChanged = (data) => {
    if (options.onQuestionChanged) {
      options.onQuestionChanged(data)
    }
    clippyInstance.stop()
    clippyInstance.play(blockAnimations[data.block.type] || blockAnimations.default)
  }

  widgetOptions.onSubmit = (data) => {
    if (options.onSubmit) {
      options.onSubmit(data)
    }
    clippyInstance.stop()
    clippyInstance.play('SendMail')
  }

  if (!options.inlineOnMobile && (options.forceTouch || isFullscreen())) {
    widgetOptions.enableFullscreen = true
    widgetOptions.forceTouch = true
  }

  const { embedId, iframe, refresh } = createIframe(formId, 'widget', widgetOptions)
  const widget = buildWidget(iframe, options.width, options.height)

  if (widgetOptions.autoResize) {
    const [minHeight, maxHeight] =
      typeof widgetOptions.autoResize === 'string'
        ? widgetOptions.autoResize.split(',').map((value) => parseInt(value))
        : []

    window.addEventListener(
      'message',
      getFormHeightChangedHandler(embedId, (data) => {
        let containerHeight = Math.max(data.height + 20, minHeight || 0)
        if (maxHeight) {
          containerHeight = Math.min(containerHeight, maxHeight)
        }
        options.container.style.height = `${containerHeight}px`
      })
    )
  }

  const appendWidget = () => options.container.append(widget)

  options.container.innerHTML = ''

  if (options.lazy) {
    lazyInitialize(options.container, appendWidget)
  } else {
    appendWidget()
  }

  if (widgetOptions.enableFullscreen) {
    let backgroundColor = ''
    const { container } = options
    const autoResize = makeAutoResize(container)
    const originalHeight = container.style.height
    const openPopup = () => {
      container.classList.add('tf-v1-widget-fullscreen')
      if (options.opacity !== undefined) {
        container.style.backgroundColor = backgroundColor
      }
      autoResize()
      window.addEventListener('resize', autoResize)
    }
    const onTheme = (data: any) => {
      backgroundColor = changeColorOpacity(data?.theme?.backgroundColor)
    }
    window.addEventListener('message', getWelcomeScreenHiddenHandler(embedId, openPopup))
    window.addEventListener('message', getFormThemeHandler(embedId, onTheme))
    const closeButton = buildCloseButton()

    const close = () => {
      window.removeEventListener('resize', autoResize)
      container.style.height = originalHeight
      options.onClose?.()
      container.classList.remove('tf-v1-widget-fullscreen')
      container.style.backgroundColor = ''

      if (options.keepSession) {
        const overlay = document.createElement('div')
        overlay.className = 'tf-v1-widget-iframe-overlay'
        overlay.onclick = () => {
          container.classList.add('tf-v1-widget-fullscreen')
          unmountElement(overlay)
        }
        widget.append(overlay)
      } else {
        options.container.innerHTML = ''
        appendWidget()
        container.append(closeButton)
      }
    }

    closeButton.onclick = close
    container.append(closeButton)
  }

  return {
    refresh,
    unmount: () => unmountElement(widget),
  }
}
