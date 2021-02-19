export type ActionableOptions = {
  /**
   * Callback function that will be executed once the typeform is ready.
   */
  onReady?: () => void

  /**
   * Callback function that will be executed right after the typeform is successfully submitted.
   */
  onSubmit?: () => void
  /**
   * Callback function that will be executed once the typeform's active screen changes.
   */
  onScreenChanged?: (event: any) => void
}
