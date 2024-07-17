'use client'

import { Popover, PopupButton } from '@typeform/embed-react'
import { useSearchParams } from 'next/navigation'

import { defaultFormId } from '../../../shared/constants'

const handleOnReady = () => {
  // eslint-disable-next-line no-console
  console.log('form in popover ready')
}

export default function Page() {
  const searchParams = useSearchParams()
  const id = searchParams?.get('id') ?? defaultFormId

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
      <p>All embed types &lt;3 Next.js version &gt;= 13</p>

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
