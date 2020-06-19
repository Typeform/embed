window.messages = []
window.addEventListener('message', function (event) {
  console.log(`${event.data.type} event has been triggered`, event.data)
  // Changes the document title when the form is ready
  if (event.data.type === 'form-ready') {
    window.document.title = event.data.type
  }
})

var EMBED_DOM_CLASSES = [
  {
    selector: '.typeform-widget',
    attribute: 'data-url'
  }, {
    selector: '.typeform-share',
    attribute: 'href'
  }, {
    selector: '.typeform-full',
    attribute: 'src'
  }
]

const addQueryStringToUrl = (url, queryString) => {
  return /\?/.test(url) ? `${url}&${queryString}` : `${url}?${queryString}`
}

window.addEventListener('DOMContentLoaded', function () {
  var queryString = window.location.search.substring(1)
  if (queryString.length === 0) {
    return
  }

  EMBED_DOM_CLASSES
    .forEach(function (embed) {
      var attribute = embed.attribute
      var embeds = document.querySelectorAll(embed.selector)
      embeds.forEach(function (embed) {
        var embedAttr = embed.getAttribute(attribute)
        embed.setAttribute(attribute, addQueryStringToUrl(embedAttr, queryString))
      })
    })
})
