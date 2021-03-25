import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
import { colors } from 'src/lib/constants'

type Props = {
  color?: string
}

function SwatchIcon({ color = colors.black }: Props) {
  return (
    <Svg width={24} height={14} viewBox="0 0 24 14" fill="none">
      <Path
        d="M.646 4.354a.5.5 0 010-.708L3.828.464a.5.5 0 01.708.708L1.707 4l2.829 2.828a.5.5 0 11-.708.708L.646 4.354zm16.285.146H1v-1h15.931v1zM23.354 10.354a.5.5 0 000-.708l-3.182-3.182a.5.5 0 10-.707.708L22.293 10l-2.828 2.828a.5.5 0 10.707.708l3.182-3.182zM7.069 10.5H23v-1H7.069v1z"
        fill={color}
      />
    </Svg>
  )
}

export default SwatchIcon
