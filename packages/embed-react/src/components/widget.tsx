import React, { CSSProperties, useEffect, useRef } from 'react'
import { createWidget, WidgetOptions, Widget as EmbedWidget } from '@typeform/embed'

import { InlineStyle } from './inline-style'

type WidgetProps = Omit<WidgetOptions, 'container'> & {
  id: string
  style?: CSSProperties
  className?: string
}

export const Widget = ({ id, style = {}, className = '', ...props }: WidgetProps) => {
  const container = useRef<HTMLDivElement>(null)
  let widgetRef = useRef<EmbedWidget | null>(null)

  useEffect(() => {
    const loadWidget = async () => {
      if (container.current) {
        let widget = await createWidget(id, { ...props, container: container.current })
        widgetRef.current = widget
      }
    }
    loadWidget()

    return () => {
      widgetRef.current?.unmount()
    }
  }, [id, props, container])

  return (
    <>
      <InlineStyle filename="widget" />
      <div style={style} className={className} ref={container} />
    </>
  )
}
