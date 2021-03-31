import { Dimensions } from 'react-native'
import { ToastProps } from 'react-native-toast-message'

const { width } = Dimensions.get('screen')

export const colors = {
  white: '#fff',
  black: '#2b2b2c',
  gray: '#DFDFDF',
}

export const stationSize = width / 2 - 10
export const journeyWidth = width - 100

export type FancyColorsType = keyof typeof fancyColors

export const fancyColors = {
  green: '#52AEAF',
  mint: '#00BAA5',
  darkGreen: '#009D74',
  salmon: '#FF8694',
  red: '#E8657F',
  darkRed: '#B92947',
  lightBlue: '#559CFF',
  blue: '#265EC2',
  purple: '#8277F6',
  brown: '#C1A875',
  orange: '#EE7C50',
  pink: '#ED6BD7',
} as any

export const fancyColorsArray = Object.keys(fancyColors).map(
  (key: FancyColorsType) => fancyColors[key]
)

export const toastConfig = {
  type: 'success',
  position: 'bottom',
  visibilityTime: 2000,
  bottomOffset: 80,
} as any

export const shadow = {
  shadowColor: '#000000',
  shadowOffset: {
    width: 0,
    height: 0,
  },
  shadowOpacity: 0.25,
  shadowRadius: 6,
  elevation: 5,
}
