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

describe('#createSidetab', () => {
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

    it('should show the icons', async () => {
      expect(screen.getByTestId('default-icon')).toBeInTheDocument()
      sidetab.open()
      expect(screen.getByTestId('spinner-icon')).toBeInTheDocument()
      jest.runAllTimers()
      const iframe = screen.getByTestId('iframe')
      fireEvent(iframe, new Event('load'))
      expect(screen.getByTestId('close-icon')).toBeInTheDocument()
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
