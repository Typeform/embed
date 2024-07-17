'use client'

import { useSearchParams } from 'next/navigation'

import { Menu } from '../shared/menu'
import { defaultFormId } from '../shared/constants'

export const AppMenu = () => {
  const query = useSearchParams()
  return <Menu id={query?.get('id') ?? defaultFormId} />
}
