import { Widget } from '@typeform/embed-react'

export default function HomePage({ id }: { id: string }) {
  const widgetContainerStyle = {
    width: 500,
    height: 400,
    margin: '20px auto',
  }

  return (
    <main>
      <p>Embed widget &lt;3 Next.js</p>

      <Widget
        id={id}
        style={widgetContainerStyle}
        medium="demo-test"
        hidden={{ foo: 'foo value', bar: 'bar value' }}
        transitiveSearchParams={['foo', 'bar']}
        iframeProps={{ title: 'Foo Bar' }}
      />
    </main>
  )
}
