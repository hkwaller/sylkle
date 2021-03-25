import { Dimensions } from 'react-native'
const { width } = Dimensions.get('screen')

export const colors = {
  white: '#fff',
  black: '#2b2b2c',
  gray: '#F8F8F8',
}

export const stationWidth = width / 2 - 10
export const journeyWidth = width - 100

export const fancyColors = {
  green: '#52AEAF',
  red: '#E8657F',
  blue: '#265EC2',
  orange: '#EE7C50',
  purple: '#8277F6',
}

export const fancyColorsArray = [
  ...Object.keys(fancyColors).map((key) => fancyColors[key]),
]
