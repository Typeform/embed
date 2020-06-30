window.messages = []
window.addEventListener('message', function (event) {
  console.log(`${event.data.type} event has been triggered`, event.data)
  // Changes the document title when the form is ready
  if (event.data.type === 'form-ready') {
    window.document.title = event.data.type
  }
})
