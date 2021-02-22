export const buildElement = (iframe: HTMLIFrameElement, className: string): HTMLDivElement => {
  const embed = document.createElement('div')
  embed.className = className
  embed.append(iframe)
  return embed
}
