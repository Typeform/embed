import { canBuildNotificationDot, saveNotificationDotHideUntilTime } from './notification-days'

const setItemMock = jest.fn()
const getItemMock = jest.fn()

describe('notification-days', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: getItemMock,
        setItem: setItemMock,
      },
    })
    jest.useFakeTimers('modern').setSystemTime(new Date('2021-06-01 00:00:00').getTime())
  })

  describe('saveNotificationDotHideUntilTime', () => {
    it('should save the "hide until time" in future', () => {
      saveNotificationDotHideUntilTime('foobar', 2)
      expect(setItemMock).toHaveBeenCalledWith(
        'tfNotificationData',
        `{"foobar":{"hideUntilTime":${new Date('2021-06-03 00:00:00').getTime()}}}`
      )
    })
  })

  describe('#canBuildNotificationDot', () => {
    it('should return true when "hide until time" is not set in local storage', () => {
      getItemMock.mockReturnValue(
        JSON.stringify({
          otherFormId: {
            hideUntilTime: 10,
          },
        })
      )
      expect(canBuildNotificationDot('myFormId')).toBe(true)
    })

    it('should return true when "hide until time" is in local storage and in past and clear it', () => {
      getItemMock.mockReturnValue(
        JSON.stringify({
          otherFormId: {
            hideUntilTime: 0,
          },
          myFormId: {
            hideUntilTime: new Date('2021-05-31 23:59:59').getTime(),
          },
        })
      )

      expect(canBuildNotificationDot('myFormId')).toBe(true)
      expect(setItemMock).toHaveBeenCalledWith('tfNotificationData', '{"otherFormId":{"hideUntilTime":0}}')
    })

    it('should return false when "hide until time" is in local storage and in future', () => {
      getItemMock.mockReturnValue(
        JSON.stringify({
          myFormId: {
            hideUntilTime: new Date('2021-06-01 12:00:00').getTime(),
          },
        })
      )

      expect(canBuildNotificationDot('myFormId')).toBe(false)
    })
  })
})
