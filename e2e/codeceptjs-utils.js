module.exports = {
  DOMSelectors: {
    progressBar: '[data-qa=fixed-footer-progress]',
    frame: 'iframe', // full page form has no data-qa
    image: '[data-qa-loaded]',
    opinionScale: '[data-qa*=blocktype-opinionScale]',
    closeButton: '[data-qa="popup-close-button"]'
  },
  resizeWindow: async (I) => {
    await I.resizeWindow(375, 600)
  }
}
