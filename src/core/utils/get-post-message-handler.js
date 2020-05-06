export const getPostMessageHandler = (type, handler, options = {}) => (event) => {
  try {
    if (event.data.type !== type) { return }

    if (options.includePayload) {
      handler(event)
    } else {
      handler()
    }
  } catch (e) { }
}
