export const colors = {
  white: '#fff',
  black: '#2b2b2c',
}

export const fancyColors = {
  green: '#52AEAF',
  red: '#E8657F',
  orange: '#EE7C50',
  purple: '#8277F6',
}

export const fancyColorsArray = [
  ...Object.keys(fancyColors).map((key: string) => `${fancyColors[key]}`),
]
