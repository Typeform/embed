import { BehavioralType } from './behavioral-type'

export type BehavioralOptions = {
  /**
   * Your typeform will launch based on behavioral triggers.
   *
   * @type {BehavioralType}
   */
  open?: BehavioralType
  openValue?: number
  /**
   * When the user closes the modal, it will not automatically reopen on next page visit.
   */
  preventReopenOnClose?: boolean
}
