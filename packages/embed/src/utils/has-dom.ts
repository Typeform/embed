export const hasDom = () => {
  return typeof document !== 'undefined' && typeof window !== 'undefined'
}
