import * as React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'

import { memoComponent, propsAreEqual } from './memo-component'

describe('memo-component', () => {
  describe('#propsAreEqual', () => {
    it('should return true for deeply equal objects', () => {
      const fn = (x: number) => x + 20
      expect(propsAreEqual({ a: 1, b: [1, 2, 3, 'a'], c: fn }, { a: 1, b: [1, 2, 3, 'a'], c: fn })).toBe(true)
    })

    it('should return true for deeply inequal objects', () => {
      expect(propsAreEqual({ a: 1, b: [1, 2] }, { a: 1, b: [1, 8] })).toBe(false)
    })
  })

  describe('#memoComponent', () => {
    const TestComponent = (props: any) => {
      const [x, setX] = React.useState(0)

      React.useEffect(() => {
        setX(x + 1)
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [props]) // this updates "x" on each re-render

      return (
        <div>
          <p data-testid="x">{x}</p>
        </div>
      )
    }

    const MemoizedTestComponent = memoComponent(TestComponent)

    const WrapperComponent = ({ ChildComponent }: any) => {
      const [irrelevant, setIrrelevant] = React.useState(0)
      const [relevant, setRelevant] = React.useState(0)

      return (
        <div>
          <button data-testid="irrelevant-button" onClick={() => setIrrelevant(irrelevant + 1)} />
          <button data-testid="relevant-button" onClick={() => setRelevant(relevant + 1)} />
          <ChildComponent relevant={relevant} />
        </div>
      )
    }

    describe('without memo', () => {
      it('should re-render component on each state change', () => {
        render(<WrapperComponent ChildComponent={TestComponent} />)
        fireEvent.click(screen.getByTestId('irrelevant-button'))
        fireEvent.click(screen.getByTestId('irrelevant-button'))
        fireEvent.click(screen.getByTestId('relevant-button'))
        expect(screen.getByTestId('x').textContent).toBe('4')
      })
    })

    describe('with memo', () => {
      it('should NOT re-render component on irrelevant state change', () => {
        render(<WrapperComponent ChildComponent={MemoizedTestComponent} />)
        fireEvent.click(screen.getByTestId('irrelevant-button'))
        fireEvent.click(screen.getByTestId('irrelevant-button'))
        expect(screen.getByTestId('x').textContent).toBe('1')
      })

      it('should re-render component on relevant state change', () => {
        render(<WrapperComponent ChildComponent={MemoizedTestComponent} />)
        fireEvent.click(screen.getByTestId('relevant-button'))
        expect(screen.getByTestId('x').textContent).toBe('2')
      })
    })
  })
})
