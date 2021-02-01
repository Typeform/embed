import { EmbedType } from '../../base'
import { FullPageOptions } from '../create-full-page'
import { SidePanelOptions } from '../create-side-panel'
import { WidgetOptions } from '../create-widget'

export type FormOptions<T extends EmbedType> = T extends 'widget'
  ? WidgetOptions
  : T extends 'fullpage'
  ? FullPageOptions
  : T extends 'side_tab'
  ? SidePanelOptions
  : {}
