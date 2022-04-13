// per docs: https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style
// setting style as string is not advised, but perfectly valid approach
interface StyleString {
  style: string
}
type HTMLIFrameElementWithStyleString = Omit<HTMLIFrameElement, 'style'> & StyleString

export type IframeOptions = {
  iframeProps?: Partial<HTMLIFrameElementWithStyleString>
}
