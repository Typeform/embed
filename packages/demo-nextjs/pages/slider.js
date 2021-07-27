import Head from 'next/head'
import PropTypes from 'prop-types'
import { SliderButton } from '@typeform/embed-react'

import Sparkle from '../components/sparkle'

export default function Slider({ id }) {
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
          <SliderButton id={id} style={buttonStyle} medium="demo-test" hidden={{ foo: 'foo value', bar: 'bar value' }}>
            open slider (right)
          </SliderButton>
        </p>

        <p>
          <SliderButton id="moe6aa" position="left" width="400" style={buttonStyle}>
            open slider (small from left)
          </SliderButton>
        </p>
      </main>
    </div>
  )
}

Slider.propTypes = {
  id: PropTypes.string,
}
