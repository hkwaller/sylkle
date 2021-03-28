import React from 'react'
import Svg, { Rect } from 'react-native-svg'

function BackgroundRight() {
  return (
    <Svg
      width={77}
      height={64}
      viewBox="0 0 77 64"
      fill="none"
      style={{ position: 'absolute', right: 0, top: 10 }}
    >
      <Rect
        width={106}
        height={27}
        rx={13.5}
        transform="matrix(-1 0 0 1 106 0)"
        fill="#8277F6"
      />
      <Rect
        width={81}
        height={27}
        rx={13.5}
        transform="matrix(-1 0 0 1 111 37)"
        fill="#52AEAF"
      />
    </Svg>
  )
}

export default BackgroundRight
