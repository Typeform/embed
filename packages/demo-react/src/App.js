import React from 'react'
import './App.css'
import { Widget, PopupButton, SliderButton, Popover, Sidetab } from '@typeform/embed-react'

const AtomIcon = () => (
  <span role="img" aria-label="atom">
    ⚛️
  </span>
)

const handleOnReady = () => {
  // eslint-disable-next-line no-console
  console.log('form ready')
}

function App() {
  return (
    <div className="App">
      <h1>This is an example React app. {React.version}</h1>
      <p>
        Embed lib &lt;3 React <AtomIcon />
      </p>
      <div className="App-spacer" />
      <div className="App-container">
        <PopupButton id="moe6aa" style={{ padding: 12, fontSize: 16 }} size={80}>
          click to open in popup
        </PopupButton>
      </div>
      <div className="App-spacer" />
      <div className="App-container">
        <SliderButton id="moe6aa" style={{ padding: 10, fontSize: 14 }} width={600} position="left">
          slide the form from left
        </SliderButton>
      </div>
      <div className="App-spacer" />
      <div className="App-container">
        <Widget
          id="moe6aa"
          style={{ margin: '0 auto', width: 500, height: 400 }}
          onReady={handleOnReady}
          enableSandbox
        />
      </div>
      <Popover id="moe6aa" tooltip="Hello there!<br/>General Kenobi" />
      <Sidetab id="moe6aa" buttonText="Open form" />
    </div>
  )
}

export default App
