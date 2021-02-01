import { BehavioralType } from './behavioral-type'

export type BehavioralOptions = {
  /**
   * Your typeform will launch based on behavioral triggers.
   *
   * @type {BehavioralType}
   */
  open?: BehavioralType
  /**
   * Configuration for behavioral triggers. Exit threshold in pixels.
   *
   * @type {number}
   */
  openPixelThreshold?: number
  /**
   * Configuration for behavioral triggers. % of page scrolled.
   *
   * @type {number}
   */
  openScrollPercentage?: number
  /**
   * Configuration for behavioral triggers. Time in milliseconds.
   *
   * @type {number}
   */
  openDelay?: number
}
