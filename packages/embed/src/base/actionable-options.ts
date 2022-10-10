export type ActionableOptions = {
  /**
   * Callback function that will be executed once the typeform is ready.
   */
  onReady?: () => void
  /**
   * Callback function that will be executed right after the typeform is successfully submitted.
   * @param {Object} payload - Event payload.
   * @param {string} payload.responseId - Response ID string.
   * @param {string} response_id - DEPRECATED.
   */
  onSubmit?: (payload: { responseId: string }) => void
  /**
   * Callback function that will be executed once the typeform's active screen changes.
   * @param {Object} event - Event payload.
   * @param {string} event.ref - New question ref.
   */
  onQuestionChanged?: (event: { ref: string }) => void
  /**
   * Callback function that will be executed once the typeform's active screen height changes.
   * @param {Object} event - Event payload.
   * @param {string} event.ref - New question ref.
   * @param {number} event.height - New question height.
   */
  onHeightChanged?: (event: { ref: string; height: number }) => void
  /**
   * Callback function that will be executed once the Iframe close button is clicked.
   */
  onClose?: () => void
  /**
   * Callback function when button on ending screen is clicked.
   */
  onEndingButtonClick?: () => void
}
