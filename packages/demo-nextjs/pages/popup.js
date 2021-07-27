import Head from 'next/head'
import PropTypes from 'prop-types'
import { PopupButton } from '@typeform/embed-react'

import Sparkle from '../components/sparkle'

export default function PopupPage({ id }) {
  const buttonStyle = {
    padding: '10px 20px',
    borderRadius: 10,
    border: 'none',
    background: 'navy',
    color: 'white',
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
          Embed popup &lt;3 Next.js <Sparkle />
        </p>

        <p>
          <PopupButton
            id={id}
            style={buttonStyle}
            size={66}
            medium="demo-test"
            hidden={{ foo: 'foo value', bar: 'bar value' }}
          >
            open popup
          </PopupButton>
        </p>
      </main>
    </div>
  )
}

PopupPage.propTypes = {
  id: PropTypes.string,
}
