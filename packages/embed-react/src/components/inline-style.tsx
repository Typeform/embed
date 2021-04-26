import React, { FC } from 'react'

interface InlineStyleProps {
  filename: string
}

export const InlineStyle: FC<InlineStyleProps> = ({ filename }: InlineStyleProps) => {
  const inlneCss = require(`../css/${filename}.css`)
  return <style>{inlneCss.default}</style>
}
