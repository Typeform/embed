import { EmbedType } from './base'
import { initializer } from './initializers'

import * as tf from './index'

module.exports = tf

function loadEmbedElements() {
  Object.values(EmbedType).forEach(initializer)
}

document.addEventListener('DOMContentLoaded', loadEmbedElements, false)
