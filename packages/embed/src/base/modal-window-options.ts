export type ModalWindowOptions = {
  /**
   * Element to place the modal window into. Optional.
   *
   * @type {HTMLElement}
   */
  container?: HTMLElement
  /**
   * Time (ms) until the embedded typeform will automatically close after a respondent clicks the Submit button.
   *
   * @type {number}
   */
  autoClose?: number
  /**
   * Reopen the modal window with form in the same state (on the same question) as it was when closed.
   */
  keepSession?: boolean
}
