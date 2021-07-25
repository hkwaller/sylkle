import React from 'react'
import Svg, { G, Path, Defs, ClipPath } from 'react-native-svg'
import { colors } from 'src/lib/constants'

type Props = {
  color: string
}

function HeartIcon({ color = colors.black }: Props) {
  return (
    <Svg width={16} height={20} viewBox="0 0 16 20" fill={color}>
      <G clipPath="url(#prefix__clip0)">
        <Path
          d="M10.792 1a3.698 3.698 0 00-2.672.974L8 2.072l-.12-.098A3.698 3.698 0 005.208 1C2.73 1 1 2.953 1 5.75c0 4.654 6.45 8.985 6.724 9.167a.5.5 0 00.552 0C8.551 14.735 15 10.404 15 5.75 15 2.953 13.27 1 10.792 1zM8 13.89c-1.213-.868-6-4.526-6-8.14C2 3.884 2.992 2 5.208 2a2.696 2.696 0 012.035.745c.156.134.32.257.491.37a.5.5 0 00.531 0c.172-.113.336-.236.491-.37A2.696 2.696 0 0110.792 2C13.008 2 14 3.884 14 5.75c0 3.614-4.787 7.272-6 8.14zm1.084-4.542A1.534 1.534 0 018 10c-.619 0-1.07-.713-1.074-.72a.5.5 0 00-.853.522C6.103 9.851 6.816 11 8 11a2.532 2.532 0 001.916-1.098.5.5 0 00-.832-.554z"
          fill={color}
        />
      </G>
      <Defs>
        <ClipPath id="prefix__clip0">
          <Path fill={color} d="M0 0h16v20H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default HeartIcon
