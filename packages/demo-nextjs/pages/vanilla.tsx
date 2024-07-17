import { useEffect, useRef } from 'react'
import { createPopup, createWidget } from '@typeform/embed'

import '@typeform/embed/build/css/popup.css'
import '@typeform/embed/build/css/widget.css'

// with @typeform/embed-react lib this component could be as short as <Widget id="HLjqXS5W" />
const Widget = ({ id }: { id: string }) => {
  const containerRef = useRef<HTMLDivElement>(null)

  const widgetContainerStyle = {
    width: 500,
    height: 400,
    margin: '20px auto',
  }

  useEffect(() => {
    if (containerRef.current) {
      createWidget(id, {
        container: containerRef.current,
        medium: 'demo-test',
        transitiveSearchParams: ['foo', 'bar'],
        hidden: { foo: 'foo value', bar: 'bar value' },
        tracking: { utm_medium: 'fb', tracking: 'bar value' },
      })
    }
  }, [id])

  return <div style={widgetContainerStyle} ref={containerRef} />
}

// with @typeform/embed-react lib this component could be as short as <PopupButton id="HLjqXS5W">click</PopupButton>
const PopupButton = ({ id }: { id: string }) => {
  const openPopup = () => {
    createPopup(id, { medium: 'demo-test', hidden: { foo: 'foo value', bar: 'bar value' } }).open()
  }

  return (
    <p>
      <button id="button" onClick={openPopup}>
        open popup
      </button>
    </p>
  )
}

export default function Popup({ id }: { id: string }) {
  return (
    <main>
      <p>Embed vanilla JavaScript library &lt;3 React and Next.js too</p>

      <PopupButton id={id} />

      <Widget id={id} />
    </main>
  )
}
