interface WithResponseId {
  responseId: string
}

interface WithFormId {
  formId: string
}

interface WithRef {
  ref: string
}

interface WithHeight {
  height: number
}

export type ActionableOptions = {
  /**
   * Callback function that will be executed once the typeform is ready.
   */
  onReady?: (event: WithFormId) => void
  /**
   * Callback function that will be executed once the typeform "submission start" event is fired.
   */
  onStarted?: (event: WithFormId & WithResponseId) => void
  /**
   * Callback function that will be executed right after the typeform is successfully submitted.
   * @param {Object} event - Event payload.
   * @param {string} event.formId - Form ID string.
   * @param {string} event.responseId - Response ID string.
   */
  onSubmit?: (event: WithFormId & WithResponseId) => void
  /**
   * Callback function that will be executed once the typeform's active screen changes.
   * @param {Object} event - Event payload.
   * @param {string} event.formId - Form ID string.
   * @param {string} event.ref - New question ref.
   */
  onQuestionChanged?: (event: WithFormId & WithRef) => void
  /**
   * Callback function that will be executed once the typeform's active screen height changes.
   * @param {Object} event - Event payload.
   * @param {string} event.formId - Form ID string.
   * @param {string} event.ref - New question ref.
   * @param {number} event.height - New question height.
   */
  onHeightChanged?: (event: WithFormId & WithRef & WithHeight) => void
  /**
   * Callback function that will be executed once the Iframe close button is clicked.
   */
  onClose?: () => void
  /**
   * Callback function when button on ending screen is clicked.
   * @param {Object} event - Event payload.
   * @param {string} event.formId - Form ID string.
   * @param {string} event.ref - End screen ref string (for plans with "Redirect from ending screen" feature).
   */
  onEndingButtonClick?: (event: WithFormId & Partial<WithRef>) => void
}
