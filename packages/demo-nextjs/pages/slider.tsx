import { useRef } from 'react'
import { GenericEmbed, SliderButton } from '@typeform/embed-react'

export default function Slider({ id }: { id: string }) {
  const sliderRef = useRef<GenericEmbed>()

  const buttonStyle = {
    padding: '10px 20px',
    borderRadius: 4,
    border: 'none',
    background: 'lightgray',
    color: 'black',
    fontSize: 16,
    cursor: 'pointer',
  }

  return (
    <main>
      <p>Embed slider &lt;3 Next.js</p>

      <p>
        <SliderButton
          id={id}
          embedRef={sliderRef}
          style={buttonStyle}
          medium="demo-test"
          hidden={{ foo: 'foo value', bar: 'bar value' }}
        >
          open slider (right)
        </SliderButton>
      </p>

      <p>
        <SliderButton id={id} position="left" width="400" style={buttonStyle}>
          open slider (small from left)
        </SliderButton>
      </p>

      <p>
        Or you can <button onClick={() => sliderRef.current?.open()}>click here</button> to open the{' '}
        <strong>slider (right)</strong> programmatically via ref.
      </p>
    </main>
  )
}
