import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
import { colors } from 'src/lib/constants'

type Props = {
  color?: string
}

function ArrowIcon({ color = colors.black }: Props) {
  return (
    <Svg width={23} height={8} viewBox="0 0 23 8" fill="none">
      <Path
        d="M22.354 4.354a.5.5 0 000-.708L19.172.464a.5.5 0 10-.707.708L21.293 4l-2.828 2.828a.5.5 0 10.707.708l3.182-3.182zM0 4.5h22v-1H0v1z"
        fill={color}
      />
    </Svg>
  )
}

export default ArrowIcon
