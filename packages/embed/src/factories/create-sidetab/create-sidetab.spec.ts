import { screen, waitForElementToBeRemoved, fireEvent } from '@testing-library/dom'

import { createSidetab, Sidetab } from './create-sidetab'

let sidetab: Sidetab

beforeEach(() => {
  jest.useFakeTimers()
})

afterEach(() => {
  sidetab.unmount()
})

describe('#createSidetab', () => {
  describe('no params', () => {
    beforeEach(() => {
      sidetab = createSidetab('formId')
    })

    describe('#open', () => {
      it('should open', () => {
        sidetab.open()
        expect(screen.getByTestId('typeform-sidetab-wrapper')).toBeInTheDocument()
      })

      it('should show the icons', async () => {
        expect(screen.getByTestId('default-icon')).toBeInTheDocument()
        sidetab.open()
        expect(screen.getByTestId('spinner-icon')).toBeInTheDocument()
        jest.runAllTimers()
        const iframe = screen.getByTestId('iframe')
        fireEvent(iframe, new Event('load'))
        expect(screen.getByTestId('typeform-sidetab-button-icon')).toBeInTheDocument()
      })
    })

    describe('#close', () => {
      it('should close', async () => {
        sidetab.open()
        jest.runAllTimers()
        sidetab.close()
        await waitForElementToBeRemoved(() => screen.queryByTestId('typeform-sidetab-wrapper'))
      })

      it('should show the icons', async () => {
        expect(screen.getByTestId('default-icon')).toBeInTheDocument()
        sidetab.open()
        expect(screen.getByTestId('spinner-icon')).toBeInTheDocument()
        jest.runAllTimers()
        const iframe = screen.getByTestId('iframe')
        fireEvent(iframe, new Event('load'))
        expect(screen.getByTestId('typeform-sidetab-button-icon')).toBeInTheDocument()
        sidetab.close()
        await waitForElementToBeRemoved(() => screen.queryByTestId('typeform-sidetab-wrapper'))
        expect(screen.getByTestId('default-icon')).toBeInTheDocument()
      })
    })

    describe('#toggle', () => {
      it('should open when closed', async () => {
        sidetab.toggle()
        expect(screen.getByTestId('typeform-sidetab-wrapper')).toBeInTheDocument()
      })

      it('should close when opened', async () => {
        sidetab.open()
        jest.runAllTimers()
        sidetab.toggle()
        await waitForElementToBeRemoved(() => screen.queryByTestId('typeform-sidetab-wrapper'))
      })
    })
  })

  describe('#size', () => {
    it('should render popover with size', async () => {
      sidetab = createSidetab('formId', { width: 400, height: 600 })
      sidetab.open()
      jest.runAllTimers()
      expect(screen.getByTestId('typeform-sidetab')).toHaveStyle({ width: '400px', height: '600px' })
    })
  })
})
