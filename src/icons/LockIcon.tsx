import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
import { colors } from 'src/lib/constants'

type Props = {
  color?: string
}

function LockIcon({ color = colors.black }: Props) {
  return (
    <Svg width={7} height={9} viewBox="0 0 7 9" fill="none">
      <Path
        d="M5.561 2.686h-4.14A1.423 1.423 0 000 4.107v2.529a1.423 1.423 0 001.422 1.421h4.14a1.423 1.423 0 001.42-1.421V4.107a1.423 1.423 0 00-1.42-1.421zm.885 3.95a.886.886 0 01-.885.884h-4.14a.886.886 0 01-.884-.884V4.107a.886.886 0 01.885-.884h4.14a.886.886 0 01.884.884v2.529zM1.88 2.149a.269.269 0 00.268-.269 1.343 1.343 0 012.686 0 .269.269 0 10.537 0 1.88 1.88 0 10-3.76 0 .269.269 0 00.269.269z"
        fill={color}
      />
      <Path
        d="M4.59 4.376L3.17 5.797l-.778-.777a.268.268 0 10-.38.38l.967.967a.269.269 0 00.38 0L4.97 4.755a.269.269 0 00-.38-.38z"
        fill={color}
      />
    </Svg>
  )
}

export default LockIcon
