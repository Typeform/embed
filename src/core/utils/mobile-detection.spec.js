import * as fixtures from '../../../test/fixtures'

import * as mobileDetection from './mobile-detection'

describe('Mobile detection', () => {
  fixtures.userAgents.forEach((fixture) => {
    it(`${fixture.name} should return ${fixture.isMobile} for isMobile`, () => {
      const result = mobileDetection.isMobile(fixture.ua)
      expect(result).toEqual(fixture.isMobile)
    })
  })
})
