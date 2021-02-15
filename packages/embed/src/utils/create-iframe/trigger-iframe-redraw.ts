/**
 * Tell browser to redraw the iframe. DIST-713.
 *
 */
export function triggerIframeRedraw() {
  // @ts-ignore
  const iframe = this as HTMLIFrameElement

  iframe.style.transform = 'translateZ(0)'
}
