import React, { CSSProperties, MutableRefObject, ReactNode, useEffect, useMemo, useRef } from 'react'

import { InlineStyle } from './inline-style'

type ButtonComponentBaseProps = {
  id: string
  style?: CSSProperties
  className?: string
  children: ReactNode
}

type ButtonComponentProps<T> = T & ButtonComponentBaseProps

type CreateFnProps<T> = Omit<ButtonComponentProps<T>, keyof ButtonComponentBaseProps>

type CreateFn<T> = (id: string, props: CreateFnProps<T>) => GenericEmbed

type GenericEmbed = {
  unmount: () => void
  open: () => void
}

const emptyEmbed: GenericEmbed = {
  unmount: () => {},
  open: () => {},
}

function makeButtonComponent<T>(createFn: CreateFn<T>, cssFilename: string) {
  return ({ id, children, style = {}, className = '', ...props }: ButtonComponentProps<T>) => {
    const ref: MutableRefObject<GenericEmbed> = useRef(emptyEmbed)
    useEffect(() => {
      ref.current = createFn(id, props)
      return () => ref.current.unmount()
    }, [id, props])

    const handleClick = useMemo(() => () => ref.current.open(), [])

    return (
      <>
        <InlineStyle filename={cssFilename} />
        <button onClick={handleClick} className={className} style={style}>
          {children}
        </button>
      </>
    )
  }
}

export { makeButtonComponent }
