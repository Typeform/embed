import {
  createPopup,
  PopupOptions,
  createSlider,
  SliderOptions,
  createPopover,
  PopoverOptions,
  createSidetab,
  SidetabOptions,
} from '@typeform/embed'

import { makeButtonComponent, makeInitializerComponent, Widget as WidgetComponent } from './components'
import { memoComponent } from './utils'

const Widget = memoComponent(WidgetComponent)

const PopupButton = memoComponent(makeButtonComponent<PopupOptions>(createPopup, 'popup'))

const SliderButton = memoComponent(makeButtonComponent<SliderOptions>(createSlider, 'slider'))

const Popover = memoComponent(makeInitializerComponent<PopoverOptions>(createPopover, 'popover'))

const Sidetab = memoComponent(makeInitializerComponent<SidetabOptions>(createSidetab, 'sidetab'))

export { Widget, PopupButton, SliderButton, Popover, Sidetab }
