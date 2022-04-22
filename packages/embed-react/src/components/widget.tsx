import React, { CSSProperties, useEffect, useRef } from 'react'
import { createWidget, WidgetOptions } from '@typeform/embed'

import { InlineStyle } from './inline-style'

type WidgetProps = Omit<WidgetOptions, 'container'> & {
  id: string
  style?: CSSProperties
  className?: string
}

export const Widget = ({ id, style = {}, className = '', ...props }: WidgetProps) => {
  const container = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (container.current) {
      const ref = createWidget(id, { ...props, container: container.current })
      return () => {
        ref.unmount()
      }
    }
  }, [id, props])

  return (
    <>
      <InlineStyle filename="widget" />
      <div style={style} className={className} ref={container} data-testid="tf-v1-widget-container" />
    </>
  )
}
