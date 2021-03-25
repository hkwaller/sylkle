import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
import { colors } from 'src/lib/constants'

type Props = {
  color?: string
}

function LongArrowIcon({ color = colors.black }: Props) {
  return (
    <Svg width={77} height={8} viewBox="0 0 77 8" fill="none">
      <Path
        d="M76.354 4.354a.5.5 0 000-.708L73.172.464a.5.5 0 10-.707.708L75.293 4l-2.829 2.828a.5.5 0 10.708.708l3.182-3.182zM0 4.5h76v-1H0v1z"
        fill={color}
      />
    </Svg>
  )
}

export default LongArrowIcon
