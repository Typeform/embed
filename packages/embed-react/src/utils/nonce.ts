declare global {
  // eslint-disable-next-line no-var
  var __webpack_nonce__: string
}

export default function getNonce() {
  return typeof global.__webpack_nonce__ !== 'undefined' ? global.__webpack_nonce__ : null
}
