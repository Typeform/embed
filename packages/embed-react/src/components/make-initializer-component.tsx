import React, { MutableRefObject, useEffect, useRef } from 'react'

import { genericEmbed, GenericEmbed } from '../utils'

import { InlineStyle } from './inline-style'

type InitializerComponentBaseProps = {
  id: string
  embedRef?: MutableRefObject<GenericEmbed | undefined>
}

export type InitializerComponentProps<T> = T & InitializerComponentBaseProps

type CreateFnProps<T> = Omit<InitializerComponentProps<T>, keyof InitializerComponentBaseProps>

type CreateFn<T> = (id: string, props: CreateFnProps<T>) => GenericEmbed

function makeInitializerComponent<T>(createFn: CreateFn<T>, cssFilename: string) {
  return ({ id, embedRef, ...props }: InitializerComponentProps<T>) => {
    const internalRef = useRef(genericEmbed)
    const ref = embedRef || internalRef

    useEffect(() => {
      ref.current = createFn(id, props)
      return () => {
        ref.current?.unmount()
      }
    }, [id, props, ref])

    return <InlineStyle filename={cssFilename} />
  }
}

export { makeInitializerComponent }
