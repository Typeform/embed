import React, {
  CSSProperties,
  MutableRefObject,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
  ReactHTML,
  HTMLAttributes,
} from 'react'

import { InlineStyle } from './inline-style'

type ButtonComponentBaseProps = {
  id: string
  as?: keyof ReactHTML
  buttonProps?: HTMLAttributes<HTMLElement> & Record<string, string>
  style?: CSSProperties
  className?: string
  children: ReactNode
  ref?: MutableRefObject<GenericEmbed>
}

type ButtonComponentProps<T> = T & ButtonComponentBaseProps

type CreateFnProps<T> = Omit<ButtonComponentProps<T>, keyof ButtonComponentBaseProps>

type CreateFn<T> = (id: string, props: CreateFnProps<T>) => GenericEmbed

export type GenericEmbed = {
  unmount: () => void
  open: () => void
}

export const emptyEmbed: GenericEmbed = {
  unmount: () => {},
  open: () => {},
}

function makeButtonComponent<T>(createFn: CreateFn<T>, cssFilename: string) {
  return ({
    id,
    children,
    as = 'button',
    style = {},
    className = '',
    buttonProps,
    ref: refOverride,
    ...props
  }: ButtonComponentProps<T>) => {
    const internalRef: MutableRefObject<GenericEmbed> = useRef(emptyEmbed)
    const ref = refOverride || internalRef

    useEffect(() => {
      ref.current = createFn(id, props)
      return () => ref.current.unmount()
    }, [id, props, ref])

    const handleClick = useMemo(() => () => ref.current.open(), [ref])

    const triggerElement = React.createElement(as, {
      style,
      className,
      onClick: handleClick,
      'data-testid': `tf-v1-${cssFilename}`,
      children,
      ...buttonProps,
    })

    return (
      <>
        <InlineStyle filename={cssFilename} />
        {triggerElement}
      </>
    )
  }
}

export { makeButtonComponent }
