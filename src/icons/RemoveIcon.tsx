import React from 'react'
import Svg, { Path } from 'react-native-svg'
import { colors } from 'src/lib/constants'

type Props = {
  color: string
}

function RemoveIcon({ color = colors.black }: Props) {
  return (
    <Svg width={15} height={14} viewBox="0 0 15 14" fill={color}>
      <Path
        stroke={color}
        strokeLinecap="round"
        d="M1.707 1L14 13.293M13.293 1L1 13.293"
      />
    </Svg>
  )
}

export default RemoveIcon
