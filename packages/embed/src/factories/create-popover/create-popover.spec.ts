import { screen, waitForElementToBeRemoved, fireEvent } from '@testing-library/dom'

import { createPopover, Popover } from './create-popover'

let popover: Popover

beforeEach(() => {
  jest.useFakeTimers()
})

afterEach(() => {
  popover.unmount()
})

describe('#createSidetab', () => {
  describe('no params', () => {
    beforeEach(() => {
      jest.useFakeTimers()
      popover = createPopover('formId')
    })

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

    describe('#buttonColor', () => {
      it('should show a default button color', () => {
        const defaultColor = 'rgb(58, 118, 133)'
        const triggerButton = screen.queryByTestId('typeform-popover-button')
        expect(triggerButton).toHaveStyle(`background-color: ${defaultColor}`)
      })
    })
  })

  describe('with params', () => {
    describe('#buttonColor', () => {
      it('should show the custom button color', () => {
        const white = 'rgb(255, 255, 255)'
        popover = createPopover('formId', { buttonColor: white })
        const triggerButton = screen.queryByTestId('typeform-popover-button')
        expect(triggerButton).toHaveStyle(`background-color: ${white}`)
      })
    })

    describe('#size', () => {
      it('should render popover with size', async () => {
        popover = createPopover('formId', { width: 400, height: 600 })
        popover.open()
        jest.runAllTimers()
        expect(screen.getByTestId('typeform-popover')).toHaveStyle({ width: '400px', height: '600px' })
      })
    })

    describe('#tooltip', () => {
      it('should render tooltip', async () => {
        popover = createPopover('formId', { tooltip: 'foobar' })
        const tooltip = screen.getByTestId('typeform-popover-tooltip')
        expect(tooltip).toHaveTextContent('foobar')
        expect(tooltip).toBeVisible()
      })

      it('should close tooltip with close icon', () => {
        popover = createPopover('formId', { tooltip: 'foobar' })
        fireEvent.click(screen.getByTestId('typeform-popover-tooltip-close'))
        jest.runAllTimers()
        expect(screen.queryByTestId('typeform-popover-tooltip')).toBeNull()
      })

      it('should close tooltip when popover is opened', () => {
        popover = createPopover('formId', { tooltip: 'foobar' })
        popover.open()
        jest.runAllTimers()
        expect(screen.queryByTestId('typeform-popover-tooltip')).toBeNull()
      })
    })
  })
})
