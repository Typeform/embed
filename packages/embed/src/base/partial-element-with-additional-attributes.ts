interface AdditionalAttributes {
  // per docs: https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style
  // setting style as string is not advised, but perfectly valid approach
  style: string

  // data attributes
  [key: `data${string}`]: string
}

export type PartialElementWithAdditionalAttributes<Element> = Partial<Omit<Element, 'style'> & AdditionalAttributes>
