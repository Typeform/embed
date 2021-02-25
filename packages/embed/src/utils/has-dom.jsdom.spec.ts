/**
 * @jest-environment jsdom
 */

import { hasDom } from './has-dom'

describe('has-dom (jsdom env)', () => {
  describe('#hasDom', () => {
    it('should return true', () => {
      expect(hasDom()).toBe(true)
    })
  })
})
