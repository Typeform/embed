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

import {
  ButtonComponentProps,
  InitializerComponentProps,
  makeButtonComponent,
  makeInitializerComponent,
  Widget as WidgetComponent,
  WidgetProps as WidgetOptions,
} from './components'
import { memoComponent } from './utils'

const Widget = memoComponent<WidgetOptions>(WidgetComponent)

const PopupButton = memoComponent<ButtonComponentProps<PopupOptions>>(
  makeButtonComponent<PopupOptions>(createPopup, 'popup')
)

const SliderButton = memoComponent<ButtonComponentProps<SliderOptions>>(
  makeButtonComponent<SliderOptions>(createSlider, 'slider')
)

const Popover = memoComponent<InitializerComponentProps<PopoverOptions>>(
  makeInitializerComponent<PopoverOptions>(createPopover, 'popover')
)

const Sidetab = memoComponent<InitializerComponentProps<SidetabOptions>>(
  makeInitializerComponent<SidetabOptions>(createSidetab, 'sidetab')
)

export { Widget, PopupButton, SliderButton, Popover, Sidetab }
