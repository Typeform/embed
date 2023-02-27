import { createRef } from 'react'
import Head from 'next/head'
import PropTypes from 'prop-types'
import { SliderButton } from '@typeform/embed-react'

import Sparkle from '../components/sparkle'

export default function Slider({ id }) {
  const sliderRef = createRef()

  const buttonStyle = {
    padding: '10px 20px',
    borderRadius: 4,
    border: 'none',
    background: 'lightgray',
    color: 'black',
    fontSize: 16,
    cursor: 'pointer',
  }

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
          Embed slider &lt;3 Next.js <Sparkle />
        </p>

        <p>
          <SliderButton
            id={id}
            ref={sliderRef}
            style={buttonStyle}
            medium="demo-test"
            hidden={{ foo: 'foo value', bar: 'bar value' }}
          >
            open slider (right)
          </SliderButton>
        </p>

        <p>
          <SliderButton id="HLjqXS5W" position="left" width="400" style={buttonStyle}>
            open slider (small from left)
          </SliderButton>
        </p>

        <p>
          Or you can <button onClick={() => sliderRef.current?.open()}>click here</button> to open the{' '}
          <strong>slider (right)</strong> programmatically via ref.
        </p>
      </main>
    </div>
  )
}

Slider.propTypes = {
  id: PropTypes.string,
}
