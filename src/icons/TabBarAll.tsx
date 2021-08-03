import * as React from 'react'
import Svg, { Rect } from 'react-native-svg'
import { colors } from 'src/lib/constants'

type Props = {
  color: string
}

function TabBarAll({ color = colors.black }: Props) {
  return (
    <Svg
      width={34}
      height={18}
      viewBox="0 0 34 18"
      fill="none"
      style={{ marginTop: 15 }}
    >
      <Rect x={2} width={29} height={2} rx={1} fill={color} />
      <Rect x={5} y={8} width={29} height={2} rx={1} fill={color} />
      <Rect y={16} width={29} height={2} rx={1} fill={color} />
    </Svg>
  )
}

export default TabBarAll
