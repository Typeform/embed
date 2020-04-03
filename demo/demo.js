window.addEventListener('message', function (event) {
  console.log(`${event.data.type} event has been triggered`)
})

var queryString = window.location.search

var EMBED_DOM_CLASSES = [
  {
    selector: '.typeform-widget',
    attribute: 'data-url',
  }, {
    selector: '.typeform-share',
    attribute: 'href',
  }, {
    selector: '.typeform-full',
    attribute: 'src',
  },
]

window.addEventListener('DOMContentLoaded', function () {
  if (queryString.length === 0) {
    return
  }

  EMBED_DOM_CLASSES
    .forEach(function (embed) {
      var attribute = embed.attribute
      var embeds = document.querySelectorAll(embed.selector)
      embeds.forEach(function (embed) {
        var embedAttr = embed.getAttribute(attribute)
        embed.setAttribute(attribute, embedAttr + queryString)
      })
    })
})
