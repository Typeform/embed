import { createRef } from 'react'
import Head from 'next/head'
import PropTypes from 'prop-types'
import { Sidetab } from '@typeform/embed-react'

import Sparkle from '../components/sparkle'

export default function SidetabPage({ id }) {
  const sidetabRef = createRef()

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
          Embed sidetab &lt;3 Next.js <Sparkle />
        </p>

        <Sidetab
          id={id}
          ref={sidetabRef}
          medium="demo-test"
          hidden={{ foo: 'foo value', bar: 'bar value' }}
          buttonText="open sidetab"
        />

        <p>
          <button onClick={() => sidetabRef.current?.open()}>Click here</button> to open the sidetab programmatically
          via ref.
        </p>
      </main>
    </div>
  )
}

SidetabPage.propTypes = {
  id: PropTypes.string,
}
