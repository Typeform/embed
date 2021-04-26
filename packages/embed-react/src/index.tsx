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

import { makeButtonComponent, makeInitializerComponent, Widget } from './components'

const PopupButton = makeButtonComponent<PopupOptions>(createPopup, 'popup')

const SliderButton = makeButtonComponent<SliderOptions>(createSlider, 'slider')

const Popover = makeInitializerComponent<PopoverOptions>(createPopover, 'popover')

const Sidetab = makeInitializerComponent<SidetabOptions>(createSidetab, 'sidetab')

export { Widget, PopupButton, SliderButton, Popover, Sidetab }
