import * as fixtures from '../../../test/fixtures'

import onMessage from './message-propagation'

import * as utils from './'

jest.mock('./message-propagation')

describe('Utilities', () => {
  describe('appendParamsToUrl', () => {
    fixtures.urls.forEach((fixture) => {
      it(`should append parameters correctly to url ${fixture.url}`, () => {
        const result = utils.appendParamsToUrl(fixture.url, fixture.params)
        expect(result).toEqual(fixture.expected)
      })
    })
  })

  describe('updateQueryStringParameter', () => {
    fixtures.urls.forEach((fixture) => {
      it(`should update parameter correctly on url ${fixture.url}`, () => {
        const key = Object.keys(fixture.params)[0]
        const value = Object.values(fixture.params)[0]
        const result = utils.updateQueryStringParameter(key, value, fixture.url)
        expect(result).toEqual(fixture.expected)
      })
    })
  })

  describe('replaceExistingKeys', () => {
    it('should return existing keys', () => {
      const options = {
        hideFooter: true
      }
      const replacer = {
        hideFooter: 'embed-hide-footer',
        opacity: 'embed-opacity'
      }
      const expectedResult = {
        'embed-hide-footer': true
      }
      const result = utils.replaceExistingKeys(options, replacer)

      expect(result).toEqual(expectedResult)
    })

    it('should not return false or null values', () => {
      const options = {
        hideFooter: false,
        opacity: null
      }
      const replacer = {
        hideFooter: 'embed-hide-footer',
        opacity: 'embed-opacity'
      }
      const expectedResult = {}
      const result = utils.replaceExistingKeys(options, replacer)

      expect(result).toEqual(expectedResult)
    })

    it('should not return values not present in the replacer', () => {
      const options = {
        myCustomOne: true,
        opacity: 80
      }
      const replacer = {
        hideFooter: 'embed-hide-footer',
        opacity: 'embed-opacity'
      }
      const expectedResult = {
        'embed-opacity': 80
      }
      const result = utils.replaceExistingKeys(options, replacer)

      expect(result).toEqual(expectedResult)
    })
  })

  describe('debounce', () => {
    it('should execute callback function after "wait" time is elapsed', () => {
      const wait = 200
      const func = jest.fn()
      const debounced = utils.debounce(func, wait)

      jest.useFakeTimers()
      debounced()

      expect(func).not.toHaveBeenCalled()

      jest.runTimersToTime(wait)

      expect(func).toHaveBeenCalled()
    })
  })

  describe('callIfEmbedIdMatches', () => {
    test('returns a function that will execute callback if embedId matches', () => {
      const embedId = '123456'
      const callback = jest.fn()
      const event = {
        detail: {
          embedId
        }
      }

      const func = utils.callIfEmbedIdMatches(callback, embedId)
      func(event)

      expect(callback).toHaveBeenCalledTimes(1)
    })

    test('returns a function that will not execute callback if embedId does not match', () => {
      const embedId = '123456'
      const callback = jest.fn()
      const event = {
        detail: {
          embedId: '098765'
        }
      }

      const func = utils.callIfEmbedIdMatches(callback, embedId)
      func(event)

      expect(callback).not.toHaveBeenCalled()
    })
  })

  describe('broadcastMessage', () => {
    beforeEach(() => onMessage.mockImplementationOnce())
    afterEach(() => jest.clearAllMocks())

    test('should propagate a message if embedId matches', () => {
      const embedId = '123456'
      const event = {
        data: {
          embedId
        }
      }

      utils.broadcastMessage(embedId, event)
      expect(onMessage).toHaveBeenCalledTimes(1)
    })

    test('should not propagate a message if embedId does not match', () => {
      const embedId = '123456'
      const event = {
        data: {
          embedId: '098765'
        }
      }

      utils.broadcastMessage(embedId, event)
      expect(onMessage).not.toHaveBeenCalled()
    })
  })

  describe('getSubmitEventData', () => {
    test('takes submission info from the event', () => {
      const detail = { response_id: 'response_id' }
      expect(utils.getSubmitEventData({ detail })).toEqual({ response_id: detail.response_id })
    })

    test('returns undefined for empty object', () => {
      expect(utils.getSubmitEventData({ detail: {} })).toEqual({ response_id: undefined })
    })
  })

  describe('removeColorTransparency', () => {
    test('should remove transparency', () => {
      expect(utils.removeColorTransparency('rgba(255, 0, 0, 0.5)')).toBe('rgb(255, 0, 0)')
      expect(utils.removeColorTransparency('rgba(255,0,0,1)')).toBe('rgb(255,0,0)')
      expect(utils.removeColorTransparency('rgba(255,0,0,.25)')).toBe('rgb(255,0,0)')
    })

    test('return the same color if there is no transparency', () => {
      expect(utils.removeColorTransparency('#ff0000')).toBe('#ff0000')
      expect(utils.removeColorTransparency('rgb(255, 0, 0)')).toBe('rgb(255, 0, 0)')
    })
  })
})
