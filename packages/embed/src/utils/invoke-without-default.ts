export const invokeWithoutDefault = (func: () => void) => (event?: MouseEvent) => {
  event?.preventDefault()
  func()
}
