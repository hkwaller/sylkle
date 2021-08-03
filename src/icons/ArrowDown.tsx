import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

function ArrowDown(props) {
  return (
    <Svg
      width={8}
      height={28}
      viewBox="0 0 8 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M3.646 27.354a.5.5 0 00.708 0l3.182-3.182a.5.5 0 10-.708-.707L4 26.293l-2.828-2.828a.5.5 0 10-.708.707l3.182 3.182zM3.5 0v27h1V0h-1z"
        fill="#000"
      />
    </Svg>
  )
}

export default ArrowDown
