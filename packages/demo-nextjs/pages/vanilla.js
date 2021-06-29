import { useEffect, useRef } from 'react'
import Head from 'next/head'
import { createPopup, createWidget } from '@typeform/embed'

import Flex from '../components/flex'

// with @typeform/embed-react lib this component could be as short as <Widget id="moe6aa" />
const Widget = () => {
  const container = useRef()

  const widgetContainerStyle = {
    width: 500,
    height: 400,
    margin: '20px auto',
  }

  useEffect(() => {
    createWidget('moe6aa', {
      container: container.current,
      medium: 'demo-test',
      transitiveSearchParams: ['foo', 'bar'],
      hidden: { foo: 'foo value', bar: 'bar value' },
    })
  }, [])

  return <div style={widgetContainerStyle} ref={container} />
}

// with @typeform/embed-react lib this component could be as short as <PopupButton id="moe6aa">click</PopupButton>
const PopupButton = () => {
  const openPopup = () => {
    createPopup('moe6aa', { medium: 'demo-test', hidden: { foo: 'foo value', bar: 'bar value' } }).open()
  }

  return (
    <p>
      <button id="button" onClick={openPopup}>
        open popup
      </button>
    </p>
  )
}

export default function Popup() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
      </Head>

      <main>
        <h1>
          This is an example <a href="https://nextjs.org">Next.js</a> app.
        </h1>

        <p>
          Embed vanilla JavaScript library &lt;3 React and Next.js too <Flex />
        </p>

        <PopupButton />

        <Widget />
      </main>
    </div>
  )
}
