import React from 'react'
import Svg, { Rect } from 'react-native-svg'

function BackgroundLeft() {
  return (
    <Svg
      width={57}
      height={64}
      viewBox="0 0 57 64"
      fill="none"
      style={{ position: 'absolute', left: 0, bottom: 70 }}
    >
      <Rect x={-12} width={69} height={27} rx={13.5} fill="#E8657F" />
      <Rect x={-27} y={37} width={70} height={27} rx={13.5} fill="#EE7C50" />
    </Svg>
  )
}

export default BackgroundLeft
