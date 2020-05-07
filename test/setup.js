require('regenerator-runtime/runtime')
const { JSDOM } = require('jsdom')

// This setup creates a fake DOM with JSDOM and set globally
// a mock document and a mock window
// NOTE: All the tests share the same fake DOM
const { window } = new JSDOM('<html><body></body></html')

global.window = window
global.document = window.document
global.navigator = {
  userAgent: 'node.js'
}
