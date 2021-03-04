import { screen, waitForElementToBeRemoved, fireEvent } from '@testing-library/dom'

import { createPopover, Popover } from './create-popover'

let popover: Popover

beforeEach(() => {
  jest.useFakeTimers()
  popover = createPopover('formId')
})

afterEach(() => {
  popover.unmount()
})

describe('#createSidetab', () => {
  describe('#open', () => {
    it('should open', () => {
      popover.open()
      jest.runAllTimers()
      expect(screen.getByTestId('typeform-popover-wrapper')).toBeInTheDocument()
    })

    it('should show the icons', async () => {
      expect(screen.getByTestId('default-icon')).toBeInTheDocument()
      popover.open()
      jest.runAllTimers()
      expect(screen.getByTestId('spinner-icon')).toBeInTheDocument()
      const iframe = screen.getByTestId('iframe')
      fireEvent(iframe, new Event('load'))
      expect(screen.getByTestId('close-icon')).toBeInTheDocument()
    })
  })

  describe('#close', () => {
    it('should close', async () => {
      popover.open()
      jest.runAllTimers()
      popover.close()
      await waitForElementToBeRemoved(() => screen.queryByTestId('typeform-popover-wrapper'))
    })

    it('should show the icons', async () => {
      expect(screen.getByTestId('default-icon')).toBeInTheDocument()
      popover.open()
      jest.runAllTimers()
      expect(screen.getByTestId('spinner-icon')).toBeInTheDocument()
      const iframe = screen.getByTestId('iframe')
      fireEvent(iframe, new Event('load'))
      expect(screen.getByTestId('close-icon')).toBeInTheDocument()
      popover.close()
      await waitForElementToBeRemoved(() => screen.queryByTestId('typeform-popover-wrapper'))
      expect(screen.getByTestId('default-icon')).toBeInTheDocument()
    })
  })

  describe('#toggle', () => {
    it('should open when closed', async () => {
      popover.toggle()
      jest.runAllTimers()
      expect(screen.getByTestId('typeform-popover-wrapper')).toBeInTheDocument()
    })

    it('should close when opened', async () => {
      popover.open()
      jest.runAllTimers()
      popover.toggle()
      await waitForElementToBeRemoved(() => screen.queryByTestId('typeform-popover-wrapper'))
    })
  })
})
