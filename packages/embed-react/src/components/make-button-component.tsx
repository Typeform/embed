import React, {
  AriaAttributes,
  CSSProperties,
  MutableRefObject,
  ReactHTML,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
} from 'react'
import { ButtonProps } from '@typeform/embed'

import { genericEmbed, GenericEmbed } from '../utils'

import { InlineStyle } from './inline-style'

type ButtonComponentBaseProps = {
  id: string
  as?: keyof ReactHTML
  buttonProps?: ButtonProps & AriaAttributes
  style?: CSSProperties
  className?: string
  children?: ReactNode
  embedRef?: MutableRefObject<GenericEmbed | undefined>
}

export type ButtonComponentProps<T> = T & ButtonComponentBaseProps

type CreateFnProps<T> = Omit<ButtonComponentProps<T>, keyof ButtonComponentBaseProps>

type CreateFn<T> = (id: string, props: CreateFnProps<T>) => GenericEmbed

function makeButtonComponent<T>(createFn: CreateFn<T>, cssFilename: string) {
  return ({
    id,
    children,
    as = 'button',
    style = {},
    className = '',
    buttonProps,
    embedRef,
    ...props
  }: ButtonComponentProps<T>) => {
    const internalRef = useRef(genericEmbed)
    const ref = embedRef || internalRef

    useEffect(() => {
      ref.current = createFn(id, props)
      return () => ref.current?.unmount()
    }, [id, props, ref])

    const handleClick = useMemo(() => () => ref.current?.open(), [ref])

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
