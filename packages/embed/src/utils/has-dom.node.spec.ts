/**
 * @jest-environment node
 */

import { hasDom } from './has-dom'

describe('has-dom (node env)', () => {
  describe('#hasDom', () => {
    it('should return false', () => {
      expect(hasDom()).toBe(false)
    })
  })
})
