export const generateEmbedId = () => {
  const randomNumber = Math.random()
  const [, randomString] = String(randomNumber).split('.')
  return randomString
}
