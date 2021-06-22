import Head from 'next/head'
import { Popover } from '@typeform/embed-react'

import Sparkle from '../components/sparkle'

const handleOnReady = () => {
  // eslint-disable-next-line no-console
  console.log('form ready')
}

export default function PopoverPage() {
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
          Embed popover &lt;3 Next.js <Sparkle />
        </p>

        <Popover
          id="moe6aa"
          onReady={handleOnReady}
          medium="demo-test"
          hidden={{ foo: 'foo value', bar: 'bar value' }}
        />
      </main>
    </div>
  )
}
