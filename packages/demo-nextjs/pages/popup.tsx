import { PopupButton } from '@typeform/embed-react'

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

  return (
    <main>
      <p>Embed popup &lt;3 Next.js</p>

      <p>
        <PopupButton
          id={id}
          style={buttonStyle}
          size={66}
          medium="demo-test"
          hidden={{ foo: 'foo value', bar: 'bar value' }}
        >
          <span role="img" aria-label="check">
            ️✅
          </span>
          <span style={{ marginLeft: 10 }}>open popup</span>
        </PopupButton>
      </p>
    </main>
  )
}
