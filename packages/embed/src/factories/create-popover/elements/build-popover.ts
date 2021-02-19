export const buildPopover = (iframe: HTMLIFrameElement): HTMLDivElement => {
  const popover = document.createElement('div')
  popover.className = 'typeform-popover'
  popover.append(iframe)
  return popover
}
