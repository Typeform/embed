export type ActionableOptions = {
  /**
   * Callback function that will be executed once the typeform is ready.
   */
  onReady?: () => void

  /**
   * Callback function that will be executed right after the typeform is successfully submitted.
   * @param {string} responseId - Response ID string.
   * @param {string} response_id - DEPRECATED.
   */
  onSubmit?: (payload: { responseId: string }) => void
  /**
   * Callback function that will be executed once the typeform's active screen changes.
   */
  onQuestionChanged?: (event: any) => void
  /**
   * Callback function that will be executed once the Iframe close button is clicked.
   */
  onClose?: () => void
}
