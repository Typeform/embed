import { Popover } from '@typeform/embed-react'

const handleOnReady = () => {
  // eslint-disable-next-line no-console
  console.log('form ready')
}

export default function PopoverPage({ id }: { id: string }) {
  return (
    <main>
      <p>Embed popover &lt;3 Next.js</p>

      <Popover
        id={id}
        onReady={handleOnReady}
        medium="demo-test"
        hidden={{ foo: 'foo value', bar: 'bar value' }}
        buttonProps={{ ariaLabel: 'Typeform Button', dataTestid: 'demo-button' }}
        tooltip="welcome"
      />
    </main>
  )
}
