import { memo, FC } from 'react'
import equal from 'fast-deep-equal'

export const propsAreEqual = <P>(nextProps: P, prevProps: P) => equal(nextProps, prevProps)

export const memoComponent = <P>(Component: FC<P>) => memo(Component, propsAreEqual)
