import * as fixtures from '../../../test/fixtures'

import * as mobileDetection from './mobile-detection'

describe('Mobile detection', () => {
  fixtures.userAgents.forEach((fixture) => {
    it(`${fixture.name} should return ${fixture.isMobile} for isMobile`, () => {
      const result = mobileDetection.isMobile(fixture.ua)
      expect(result).toEqual(fixture.isMobile)
    })

    it(`${fixture.name} should return ${fixture.isMobile} for isSafari`, () => {
      const result = mobileDetection.isSafari(fixture.ua)
      expect(result).toEqual(fixture.isSafari)
    })

    it(`${fixture.name} should return ${fixture.isMobile} for isIOSDevice`, () => {
      const result = mobileDetection.isIOSDevice(fixture.ua)
      expect(result).toEqual(fixture.isIOSDevice)
    })
  })
})
