import { BehavioralType } from './behavioral-type'

export type BehavioralOptions = {
  /**
   * Your typeform will launch based on behavioral triggers.
   *
   * @type {BehavioralType}
   */
  open?: BehavioralType
  openValue?: number
}
