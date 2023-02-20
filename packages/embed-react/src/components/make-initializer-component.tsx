import React, { useEffect, MutableRefObject, useRef } from 'react'

import { InlineStyle } from './inline-style'

type InitializerComponentBaseProps = {
  id: string
}

type InitializerComponentProps<T> = T & InitializerComponentBaseProps

type CreateFnProps<T> = Omit<InitializerComponentProps<T>, keyof InitializerComponentBaseProps>

type CreateFn<T> = (id: string, props: CreateFnProps<T>) => GenericEmbed

type GenericEmbed = {
  unmount: () => void
}

const emptyEmbed: GenericEmbed = {
  unmount: () => {},
}

function makeInitializerComponent<T>(createFn: CreateFn<T>, cssFilename: string) {
  const Embed = ({ id, ...props }: InitializerComponentProps<T>, refOverride: MutableRefObject<GenericEmbed> | any) => {
    const internalRef = useRef(emptyEmbed)
    const ref = refOverride || internalRef

    useEffect(() => {
      ref.current = createFn(id, props)
      return () => {
        ref.current.unmount()
      }
    }, [id, props, ref])

    return <InlineStyle filename={cssFilename} />
  }

  return React.forwardRef(Embed)
}

export { makeInitializerComponent }
