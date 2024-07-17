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
  WidgetProps,
} from './components'
import { memoComponent, GenericEmbed } from './utils'

export { WidgetProps, GenericEmbed }
export const Widget = memoComponent<WidgetProps>(WidgetComponent)

export type PopupButtonProps = ButtonComponentProps<PopupOptions>
export const PopupButton = memoComponent<PopupButtonProps>(makeButtonComponent<PopupOptions>(createPopup, 'popup'))

export type SliderButtonProps = ButtonComponentProps<SliderOptions>
export const SliderButton = memoComponent<SliderButtonProps>(makeButtonComponent<SliderOptions>(createSlider, 'slider'))

export type PopoverProps = InitializerComponentProps<PopoverOptions>
export const Popover = memoComponent<PopoverProps>(makeInitializerComponent<PopoverOptions>(createPopover, 'popover'))

export type SidetabProps = InitializerComponentProps<SidetabOptions>
export const Sidetab = memoComponent<SidetabProps>(makeInitializerComponent<SidetabOptions>(createSidetab, 'sidetab'))
