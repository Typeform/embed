import React from 'react'
import createEmotion from 'create-emotion'
import createEmotionStyled from 'create-emotion-styled'

const context = typeof global !== 'undefined' ? global : {}

const emotion = createEmotion(context)

export const css = emotion.css
export const injectGlobal = emotion.injectGlobal
export const keyframes = emotion.keyframes
export default createEmotionStyled(emotion, React)
