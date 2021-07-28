import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

function Target() {
  return (
    <Svg width={8} height={11} viewBox="0 0 8 11" fill="none">
      <Path
        d="M6.758.181C6.104.054 5.535.265 5.039.445c-.537.2-.98.369-1.476.137v-.19c0-.19-.137-.37-.326-.39a.371.371 0 00-.412.369v6.81C1.212 7.255 0 7.856 0 8.594c0 .79 1.423 1.423 3.184 1.423 1.76 0 3.184-.643 3.184-1.423 0-.738-1.202-1.328-2.815-1.413V3.818c.169.053.327.063.485.063.432 0 .833-.147 1.212-.284.464-.169.896-.338 1.392-.243a.317.317 0 00.369-.305V.487A.297.297 0 006.758.18zM5.514 8.246c0 .559-1.044 1.012-2.33 1.012S.854 8.805.854 8.246c0-.358.432-.675 1.096-.854-.348.148-.569.359-.569.601 0 .453.812.822 1.803.822 1.012 0 1.803-.358 1.803-.822 0-.232-.222-.443-.57-.59.665.168 1.097.485 1.097.843zM4.48 7.782c0 .295-.59.548-1.297.548-.706 0-1.297-.253-1.297-.548 0-.2.264-.39.664-.485-.116.064-.19.148-.19.232 0 .2.37.359.823.359.453 0 .822-.158.822-.359 0-.084-.074-.168-.19-.232.401.106.665.285.665.485z"
        fill="#000"
      />
    </Svg>
  )
}

export default Target