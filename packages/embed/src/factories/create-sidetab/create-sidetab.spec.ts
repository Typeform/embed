import { screen, waitForElementToBeRemoved, fireEvent } from '@testing-library/dom'

import { createSidetab, Sidetab } from './create-sidetab'

let sidetab: Sidetab

beforeEach(() => {
  jest.useFakeTimers()
  sidetab = createSidetab('formId')
})

afterEach(() => {
  sidetab.unmount()
})

describe('create-sidetab', () => {
  describe('#createPopup', () => {
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
        expect(screen.getByTestId('close-icon')).toBeInTheDocument()
      })
    })

    describe('#close', () => {
      it('should close', async () => {
        sidetab.open()
        jest.runAllTimers()
        sidetab.close()
        await waitForElementToBeRemoved(() => screen.queryByTestId('typeform-sidetab-wrapper'))
      })
    })
  })
})
