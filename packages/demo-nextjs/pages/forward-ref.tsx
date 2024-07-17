import { useRef } from 'react'
import { PopupButton, GenericEmbed } from '@typeform/embed-react'

export default function PopupPage({ id }: { id: string }) {
  const buttonStyle = {
    padding: '10px 20px',
    borderRadius: 10,
    border: 'none',
    background: 'navy',
    color: 'white',
    fontSize: 16,
    cursor: 'pointer',
  }
  const ref = useRef<GenericEmbed>()

  return (
    <main>
      <p>Embed popup with forwarded ref &lt;3 Next.js</p>

      <p>
        <PopupButton id={id} embedRef={ref} style={buttonStyle} size={66} medium="demo-test">
          <span role="img" aria-label="check">
            ️✅
          </span>
          <span style={{ marginLeft: 10 }}>open popup</span>
        </PopupButton>
      </p>

      <p>
        <button onClick={() => ref.current?.open()}>click here to open the popup via ref</button>
      </p>
    </main>
  )
}
