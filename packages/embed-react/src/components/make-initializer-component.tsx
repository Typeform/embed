import React, { useEffect } from 'react'

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

function makeInitializerComponent<T>(createFn: CreateFn<T>, cssFilename: string) {
  return ({ id, ...props }: InitializerComponentProps<T>) => {
    useEffect(() => {
      const ref = createFn(id, props)
      return () => {
        ref.unmount()
      }
    }, [id, props])
    return <InlineStyle filename={cssFilename} />
  }
}

export { makeInitializerComponent }
