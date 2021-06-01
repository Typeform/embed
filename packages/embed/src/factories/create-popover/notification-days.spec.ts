import { canBuildNotificationDot } from './notification-days'

const setItemMock = jest.fn()

const localStorageMockhelper = (value: any) => {
  Object.defineProperty(window, 'localStorage', {
    value: {
      getItem: jest.fn().mockReturnValue(JSON.stringify(value)),
      setItem: setItemMock,
    },
  })
}

describe('notification-days', () => {
  describe('#canBuildNotificationDot', () => {
    it('should return true when expiry date is not set in local storage and set it in local storage', () => {
      const data = {
        otherFormId: {
          expiryDate: 10,
        },
      }
      localStorageMockhelper(data)

      expect(canBuildNotificationDot('myFormId', 2)).toBeTruthy()
      expect(setItemMock.mock.calls[0][0]).toBe('tfNotificationData')
      expect(setItemMock.mock.calls[0][1]).toMatch(/{"otherFormId":{"expiryDate":10},"myFormId":{"expiryDate":[0-9]+}}/)
    })

    it('should return true when expiry date is in local storage and in future', () => {
      const expiryDate = new Date()
      expiryDate.setDate(expiryDate.getDate() + 2)

      localStorageMockhelper({
        myFormId: {
          expiryDate: expiryDate.getTime(),
        },
      })

      expect(canBuildNotificationDot('myFormId', 0)).toBeTruthy()
    })

    it('should return false when expiry date is in local storage and in past', () => {
      const expiryDate = new Date()
      expiryDate.setDate(expiryDate.getDate() - 2)

      localStorageMockhelper({
        myFormId: {
          expiryDate: expiryDate.getTime(),
        },
      })

      expect(canBuildNotificationDot('myFormId', 0)).toBeTruthy()
    })
  })
})
