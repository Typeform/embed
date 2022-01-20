import { refreshIframe } from './refresh-iframe'

describe('refreshIframe', () => {
  it('should add the refresh param to the iframe', () => {
    const iframeEl = document.createElement('iframe')
    iframeEl.src = 'https://test.com/?somequery=value#somehash=value'

    expect(iframeEl.src).toEqual('https://test.com/?somequery=value#somehash=value')

    refreshIframe(iframeEl)

    expect(iframeEl.src).toEqual('https://test.com/?somequery=value&refresh#somehash=value')
  })

  it('should remove refresh param', () => {
    const iframeEl = document.createElement('iframe')
    iframeEl.src = 'https://test.com/?somequery=value&refresh#somehash=value'

    expect(iframeEl.src).toEqual('https://test.com/?somequery=value&refresh#somehash=value')

    refreshIframe(iframeEl)

    expect(iframeEl.src).toEqual('https://test.com/?somequery=value#somehash=value')
  })

  it('should void if no iframe', () => {
    refreshIframe()
  })
})
