import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
import { colors } from 'src/lib/constants'

type Props = {
  color?: string
}

function HouseIcon({ color = colors.black }: Props) {
  return (
    <Svg width={13} height={13} viewBox="0 0 13 13" fill="none">
      <Path
        d="M10.751 12.5H8.136a.545.545 0 01-.545-.546V8.682a1.09 1.09 0 00-2.182 0v3.272a.545.545 0 01-.545.546H2.249A1.75 1.75 0 01.5 10.75V5.954a.545.545 0 01.18-.405L6.136.64a.545.545 0 01.73 0l5.454 4.91a.545.545 0 01.181.404v4.797a1.75 1.75 0 01-1.749 1.749zm-2.07-1.091h2.07a.658.658 0 00.658-.658V6.197L6.5 1.78 1.59 6.197v4.554a.658.658 0 00.659.658h2.07V8.682a2.182 2.182 0 014.363 0v2.727z"
        fill={color}
      />
    </Svg>
  )
}

export default HouseIcon
