import React, { useEffect, useRef } from 'react'

import { InlineStyle } from './inline-style'

type InitializerComponentBaseProps = {
  id: string
}

type InitializerComponentProps<T> = T & InitializerComponentBaseProps

type CreateFnProps<T> = Omit<InitializerComponentProps<T>, keyof InitializerComponentBaseProps>

type CreateFn<T> = (id: string, props: CreateFnProps<T>) => Promise<GenericEmbed>

type GenericEmbed = {
  unmount: () => void
}

function makeInitializerComponent<T>(createFn: CreateFn<T>, cssFilename: string) {
  return ({ id, ...props }: InitializerComponentProps<T>) => {
    const ref = useRef<GenericEmbed | null>(null)
    useEffect(() => {
      const loadWidget = async () => {
        ref.current = await createFn(id, props)
      }
      loadWidget()
      return () => ref.current?.unmount()
    }, [id, props])
    return <InlineStyle filename={cssFilename} />
  }
}

export { makeInitializerComponent }
