import { Widget } from '@typeform/embed-react'

import { defaultFormIdEURegion } from '../shared/constants'

export default function HomePage() {
  const widgetContainerStyle = {
    width: 500,
    height: 400,
    margin: '20px auto',
  }

  return (
    <main>
      <p>Embed widget &lt;3 Next.js</p>

      <Widget
        id={defaultFormIdEURegion}
        style={widgetContainerStyle}
        medium="demo-test"
        region={'eu'}
        hidden={{ foo: 'foo value', bar: 'bar value' }}
        transitiveSearchParams={['foo', 'bar']}
        iframeProps={{ title: 'Foo Bar' }}
      />
    </main>
  )
}
