import React from 'react'
import Svg, { Path } from 'react-native-svg'
import { fancyColors } from 'src/lib/constants'

function LocationIcon() {
  return (
    <Svg width={12} height={17} viewBox="0 0 12 17" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6 0C2.689 0 0 2.758 0 6.155c0 .99.502 2.384 1.236 3.84 1.618 3.21 4.312 6.778 4.312 6.778A.566.566 0 006 17a.566.566 0 00.452-.227s2.694-3.568 4.312-6.777C11.498 8.539 12 7.145 12 6.156 12 2.757 9.311 0 6 0zm0 3.517c-1.42 0-2.571 1.182-2.571 2.638S4.58 8.793 6 8.793c1.42 0 2.571-1.182 2.571-2.638S7.42 3.517 6 3.517z"
        fill={fancyColors.green}
      />
    </Svg>
  )
}

export default LocationIcon
