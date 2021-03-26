import { Dimensions } from 'react-native'
const { width } = Dimensions.get('screen')

export const colors = {
  white: '#fff',
  black: '#2b2b2c',
  gray: '#F8F8F8',
}

export const stationSize = width / 2 - 10
export const journeyWidth = width - 100

export const fancyColors = {
  green: '#52AEAF',
  mint: '##00BAA5',
  darkGreen: '##009D74',
  salmon: '#FF8694',
  red: '#E8657F',
  darkRed: '##B92947',
  lightBlue: '##559CFF',
  blue: '#265EC2',
  brown: '#C1A875',
  orange: '#EE7C50',
  purple: '#8277F6',
  pink: '#ED6BD7',
}

export const fancyColorsArray = [
  ...Object.keys(fancyColors).map((key) => fancyColors[key]),
]
