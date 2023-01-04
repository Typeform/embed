import { screen, waitForElementToBeRemoved, fireEvent } from '@testing-library/dom'

import { createPopover, Popover } from './create-popover'

let popover: Popover

const mockedLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
}

beforeAll(() => {
  jest.useFakeTimers('modern').setSystemTime(new Date('2021-06-01 00:00:00').getTime())
})

beforeEach(() => {
  jest.useFakeTimers()
  Object.defineProperty(window, 'localStorage', {
    value: mockedLocalStorage,
  })
})

afterEach(() => {
  popover.unmount()
  mockedLocalStorage.getItem.mockReset()
  mockedLocalStorage.setItem.mockReset()
})

describe('#createSidetab', () => {
  describe('no params', () => {
    beforeEach(async () => {
      popover = await createPopover('formId')
    })

    describe('#open', () => {
      it('should open', () => {
        popover.open()
        jest.runAllTimers()
        expect(screen.getByTestId('tf-v1-popover-wrapper')).toBeInTheDocument()
      })

      it('should show the icons', async () => {
        expect(screen.getByTestId('default-icon')).toBeInTheDocument()
        popover.open()
        jest.runAllTimers()
        expect(screen.getByTestId('spinner-icon')).toBeInTheDocument()
        const iframe = screen.getByTestId('iframe')
        fireEvent(iframe, new Event('load'))
        expect(screen.getByTestId('tf-v1-popover-button-icon')).toBeInTheDocument()
      })
    })

    describe('#close', () => {
      it('should close', async () => {
        popover.open()
        jest.runAllTimers()
        popover.close()
        await waitForElementToBeRemoved(() => screen.queryByTestId('tf-v1-popover-wrapper'))
      })

      it('should show the icons', async () => {
        expect(screen.getByTestId('default-icon')).toBeInTheDocument()
        popover.open()
        jest.runAllTimers()
        expect(screen.getByTestId('spinner-icon')).toBeInTheDocument()
        const iframe = screen.getByTestId('iframe')
        fireEvent(iframe, new Event('load'))
        expect(screen.getByTestId('tf-v1-popover-button-icon')).toBeInTheDocument()
        popover.close()
        await waitForElementToBeRemoved(() => screen.queryByTestId('tf-v1-popover-wrapper'))
        expect(screen.getByTestId('default-icon')).toBeInTheDocument()
      })

      it('should run onClose callback if provided', async () => {
        const onClose = jest.fn()
        const popover = await createPopover('formId', { onClose })
        popover.open()
        popover.close()
        expect(onClose).toHaveBeenCalledTimes(1)
        popover.unmount()
      })
    })

    describe('#toggle', () => {
      it('should open when closed', async () => {
        popover.toggle()
        jest.runAllTimers()
        expect(screen.getByTestId('tf-v1-popover-wrapper')).toBeInTheDocument()
      })

      it('should close when opened', async () => {
        popover.open()
        jest.runAllTimers()
        popover.toggle()
        await waitForElementToBeRemoved(() => screen.queryByTestId('tf-v1-popover-wrapper'))
      })
    })

    describe('#buttonColor', () => {
      it('should show a default button color', () => {
        const defaultColor = 'rgb(58, 118, 133)'
        const triggerButton = screen.queryByTestId('tf-v1-popover-button')
        expect(triggerButton).toHaveStyle(`background-color: ${defaultColor}`)
      })
    })
  })

  describe('with params', () => {
    describe('#buttonColor', () => {
      it('should show the custom button color', async () => {
        const white = 'rgb(255, 255, 255)'
        popover = await createPopover('formId', { buttonColor: white })
        const triggerButton = screen.queryByTestId('tf-v1-popover-button')
        expect(triggerButton).toHaveStyle(`background-color: ${white}`)
      })
    })

    describe('#size', () => {
      it('should render popover with size', async () => {
        popover = await createPopover('formId', { width: 400, height: 600 })
        popover.open()
        jest.runAllTimers()
        expect(screen.getByTestId('tf-v1-popover')).toHaveStyle({ width: '400px', height: '600px' })
      })
    })

    describe('#tooltip', () => {
      it('should render tooltip', async () => {
        popover = await createPopover('formId', { tooltip: 'foobar' })
        const tooltip = screen.getByTestId('tf-v1-popover-tooltip')
        expect(tooltip).toHaveTextContent('foobar')
        expect(tooltip).toBeVisible()
      })

      it('should close tooltip with close icon', async () => {
        popover = await createPopover('formId', { tooltip: 'foobar' })
        fireEvent.click(screen.getByTestId('tf-v1-popover-tooltip-close'))
        jest.runAllTimers()
        expect(screen.queryByTestId('tf-v1-popover-tooltip')).toBeNull()
      })

      it('should close tooltip when popover is opened', async () => {
        popover = await createPopover('formId', { tooltip: 'foobar' })
        popover.open()
        jest.runAllTimers()
        expect(screen.queryByTestId('tf-v1-popover-tooltip')).toBeNull()
      })
    })

    describe('#notificationDot', () => {
      it('should render notification dot', async () => {
        popover = await createPopover('formId', { notificationDays: 1 })
        expect(screen.getByTestId('tf-v1-popover-unread-dot')).toBeInTheDocument()
      })

      it('should hide notification dot on form open', async () => {
        popover = await createPopover('formId', { notificationDays: 2 })
        fireEvent.click(screen.getByTestId('tf-v1-popover-button'))
        jest.runAllTimers()
        expect(screen.queryByTestId('tf-v1-popover-unread-dot')).toBeNull()
      })

      it('should not store "hide until time" data in localStorage', async () => {
        popover = await createPopover('formId', { notificationDays: 2 })
        jest.runAllTimers()
        expect(mockedLocalStorage.setItem).toHaveBeenCalledTimes(0)
      })

      it('should store "hide until time" data in localStorage on open', async () => {
        popover = await createPopover('formId', { notificationDays: 2 })
        popover.open()
        jest.runAllTimers()
        expect(mockedLocalStorage.setItem).toHaveBeenCalledWith(
          'tfNotificationData',
          `{"formId":{"hideUntilTime":${new Date('2021-06-03 00:00:00').getTime()}}}`
        )
      })
    })
  })
})
