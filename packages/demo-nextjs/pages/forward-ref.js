import { useRef } from 'react'
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
  const ref = useRef()

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
          Embed popup with forwarded ref &lt;3 Next.js <Sparkle />
        </p>

        <p>
          <PopupButton id={id} embedRef={ref} style={buttonStyle} size={66} medium="demo-test">
            <span role="img" aria-label="check">
              ️✅
            </span>
            <span style={{ marginLeft: 10 }}>open popup</span>
          </PopupButton>
        </p>

        <p>
          <button onClick={() => ref.current.open()}>click here to open the popup via ref</button>
        </p>
      </main>
    </div>
  )
}

PopupPage.propTypes = {
  id: PropTypes.string,
}
