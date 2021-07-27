import Head from 'next/head'
import PropTypes from 'prop-types'
import { Sidetab } from '@typeform/embed-react'

import Sparkle from '../components/sparkle'

export default function SidetabPage({ id }) {
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

        <Sidetab id={id} medium="demo-test" hidden={{ foo: 'foo value', bar: 'bar value' }} buttonText="open sidetab" />
      </main>
    </div>
  )
}

SidetabPage.propTypes = {
  id: PropTypes.string,
}
