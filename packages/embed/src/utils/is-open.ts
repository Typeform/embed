export interface HTMLElementWithParentNode extends HTMLElement {
  parentNode: Node & ParentNode
}

export const isOpen = (element: HTMLElement): element is HTMLElementWithParentNode => {
  return isInPage(element) && isVisible(element)
}

export const isInPage = (element: HTMLElement): boolean => !!element.parentNode

export const isVisible = (element: HTMLElement): boolean => element.style.display !== 'none'
