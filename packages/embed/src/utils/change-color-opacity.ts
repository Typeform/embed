export const changeColorOpacity = (color = '', opacity = 255) => {
  if (color.startsWith('rgba(')) {
    return color?.replace(/, [\d.]+\)$/, `, ${opacity})`)
  }
  return color
}
