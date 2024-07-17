'use client'

import { Widget } from '@typeform/embed-react'
import { useSearchParams } from 'next/navigation'

import { defaultFormId } from '../../../shared/constants'

export default function Page() {
  const searchParams = useSearchParams()
  const widgetContainerStyle = {
    width: 500,
    height: 400,
    margin: '20px auto',
  }

  return (
    <main>
      <p>Embed widget &lt;3 Next.js version &lt;= 13</p>

      <Widget
        id={searchParams?.get('id') ?? defaultFormId}
        style={widgetContainerStyle}
        medium="demo-test"
        hidden={{ foo: 'foo value', bar: 'bar value' }}
        transitiveSearchParams={['foo', 'bar']}
        iframeProps={{ title: 'Foo Bar' }}
      />
    </main>
  )
}
