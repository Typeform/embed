import { useRef } from 'react'
import { GenericEmbed, Sidetab } from '@typeform/embed-react'

export default function SidetabPage({ id }: { id: string }) {
  const sidetabRef = useRef<GenericEmbed>()

  return (
    <main>
      <p>Embed sidetab &lt;3 Next.js</p>

      <Sidetab
        id={id}
        embedRef={sidetabRef}
        medium="demo-test"
        hidden={{ foo: 'foo value', bar: 'bar value' }}
        buttonText="open sidetab"
      />

      <p>
        <button onClick={() => sidetabRef.current?.open()}>Click here</button> to open the sidetab programmatically via
        ref.
      </p>
    </main>
  )
}
