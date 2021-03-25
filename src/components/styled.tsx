import { Text as RNText } from 'react-native'
import styled from 'styled-components/native'
import { View } from '@motify/components'
import { colors } from 'src/lib/constants'

export const AppHeader = styled.Text`
  font-family: 'SansationBold';
  font-size: 40px;
  font-weight: 800;
`
export const Header = styled.Text`
  font-family: 'Sansation';
  font-size: 18px;
`

export const ListWrapper = styled(View)`
  padding-top: 30px;
  align-items: flex-start;
  background-color: ${colors.gray};
  padding: 20px;
  padding-top: 10px;
  margin: -20px;
`

export const RowView = styled(View)`
  flex-direction: row;
  align-items: center;
`

type TextProps = {
  readonly white?: boolean
  readonly medium?: boolean
  readonly big?: boolean
  readonly size?: number
  readonly center?: boolean
}

export const Text = styled(RNText)<TextProps>`
  font-family: ${({ medium }) => (medium ? 'SansationBold' : 'Sansation')};
  font-size: ${({ big, size }) => (size ? `${size}px` : big ? '18px' : '14px')};
  color: ${({ white }) => (white ? colors.white : colors.black)};
  text-align: ${({ center }) => (center ? 'center' : 'left')};
`
