import React, { FC } from 'react'

import getNonce from '../utils/nonce'

interface InlineStyleProps {
  filename: string
}

export const InlineStyle: FC<InlineStyleProps> = ({ filename }: InlineStyleProps) => {
  const inlneCss = require(`../css/${filename}.css`)
  const nonce = getNonce()
  return <style {...(nonce ? { nonce } : {})} dangerouslySetInnerHTML={{ __html: inlneCss.default }} />
}
