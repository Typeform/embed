import { PartialElementWithAdditionalAttributes } from './partial-element-with-additional-attributes'

export type ButtonProps = PartialElementWithAdditionalAttributes<HTMLButtonElement>

export type ButtonOptions = {
  buttonProps?: ButtonProps
}
