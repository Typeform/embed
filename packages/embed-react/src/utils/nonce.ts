declare global {
  namespace NodeJS {
    interface Global {
      __webpack_nonce__: string
    }
  }
}

export default function getNonce() {
  return typeof global.__webpack_nonce__ !== 'undefined' ? global.__webpack_nonce__ : null
}
