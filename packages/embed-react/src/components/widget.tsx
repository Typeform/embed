import React, { CSSProperties, useEffect, useRef, memo } from 'react'
import equal from 'fast-deep-equal'
import { createWidget, WidgetOptions } from '@typeform/embed'

import { InlineStyle } from './inline-style'

type WidgetProps = Omit<WidgetOptions, 'container'> & {
  id: string
  style?: CSSProperties
  className?: string
}

function areEqual(prevProps: WidgetProps, nextProps: WidgetProps) {
  return equal(prevProps, nextProps)
}

export const Widget = memo(({ id, style = {}, className = '', ...props }: WidgetProps) => {
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
      <div style={style} className={className} ref={container} />
    </>
  )
}, areEqual)
