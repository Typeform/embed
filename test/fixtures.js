export const urls = [{
  url: 'https://admin.typeform.com/to/bXK16J',
  params: { 'hola': 'mandarina' },
  expected: 'https://admin.typeform.com/to/bXK16J?hola=mandarina',
}, {
  url: 'https://url.com?hola=true',
  params: { 'mandarina': 'apple' },
  expected: 'https://url.com?hola=true&mandarina=apple',
}, {
  url: 'https://url.com/',
  params: { 'mandarina': 'apple' },
  expected: 'https://url.com?mandarina=apple',
}, {
  url: 'https://url.com?mandarina=true',
  params: { 'mandarina': 'apple' },
  expected: 'https://url.com?mandarina=apple',
}]

export const userAgents = [{
  name: 'Safari iOS 10 (iPhone)',
  ua: 'Mozilla/5.0 (iPod touch; CPU iPhone OS 10_2_1 like Mac OS X) AppleWebKit/602.4.6 (KHTML, like Gecko) Version/10.0 Mobile/14D27 Safari/602.1',
  isMobile: true,
  isSafari: true,
  isIOSDevice: true,
}, {
  name: 'Chrome mobile (Nexus)',
  ua: 'Mozilla/5.0 (Linux; Android 4.0.4; Galaxy Nexus Build/IMM76B) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.133 Mobile Safari/535.19',
  isMobile: true,
  isSafari: false,
  isIOSDevice: false,
}, {
  name: 'Safari iOS 9 (iPad)',
  ua: 'Mozilla/5.0 (iPad; CPU OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B137 Safari/601.1',
  isMobile: true,
  isSafari: true,
  isIOSDevice: true,
}, {
  name: 'Chrome iOS 9 (iPhone)',
  ua: 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1 (KHTML, like Gecko) CriOS/56.0.2924.87 Mobile/13B143 Safari/601.1.46',
  isMobile: true,
  isSafari: true, // ?
  isIOSDevice: true,
}, {
  name: 'Edge Windows',
  ua: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.10240',
  isMobile: false,
  isSafari: false,
  isIOSDevice: false,
}, {
  name: 'Safari Mac OS',
  ua: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3) AppleWebKit/537.75.14 (KHTML, like Gecko) Version/7.0.3 Safari/7046A194A',
  isMobile: false,
  isSafari: true,
  isIOSDevice: false,
}]
