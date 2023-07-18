import { PartialElementWithAdditionalAttributes } from './partial-element-with-additional-attributes'

export type IframeProps = PartialElementWithAdditionalAttributes<HTMLIFrameElement>

export type IframeOptions = {
  iframeProps?: IframeProps
}
