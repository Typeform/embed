import Head from 'next/head'
import { Widget } from '@typeform/embed-react'

import Sparkle from '../components/sparkle'

export default function HomePage() {
  const widgetContainerStyle = {
    width: 500,
    height: 400,
    margin: '20px auto',
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
          Embed widget &lt;3 Next.js <Sparkle />
        </p>

        <Widget
          id="moe6aa"
          style={widgetContainerStyle}
          medium="demo-test"
          hidden={{ foo: 'foo value', bar: 'bar value' }}
          transitiveSearchParams={['foo', 'bar']}
        />
      </main>
    </div>
  )
}
