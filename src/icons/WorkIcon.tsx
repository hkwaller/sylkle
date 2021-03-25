import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
import { colors } from 'src/lib/constants'

type Props = {
  color?: string
}

function WorkIcon({ color = colors.black }: Props) {
  return (
    <Svg width={15} height={13} viewBox="0 0 15 13" fill="none">
      <Path
        d="M13.677 1.765H11.47v-.441A1.324 1.324 0 0010.147 0H4.853a1.324 1.324 0 00-1.324 1.324v.44H1.324A1.27 1.27 0 000 2.975v2.488a1.218 1.218 0 00.882 1.13v4.41a1.324 1.324 0 001.324 1.35h10.588a1.324 1.324 0 001.324-1.323V6.618A1.218 1.218 0 0015 5.488V2.974a1.27 1.27 0 00-1.323-1.21zm-9.265-.441a.441.441 0 01.44-.442h5.295a.441.441 0 01.441.442v.44H4.412v-.44zm8.382 10.147H2.206a.441.441 0 01-.441-.442V6.84l5.347 1.446c.128.04.262.06.397.062.128.001.256-.017.38-.053l5.346-1.456v4.191a.442.442 0 01-.44.442zm1.324-6.01a.343.343 0 01-.292.3L7.65 7.439a.494.494 0 01-.291 0L1.182 5.771a.344.344 0 01-.3-.31V2.975c0-.177.203-.327.442-.327h2.205v.882h.883v-.882h6.176v.882h.883v-.882h2.206c.238 0 .44.15.44.327v2.488zM7.94 6.619a.441.441 0 11-.882 0 .441.441 0 01.882 0z"
        fill={color}
      />
    </Svg>
  )
}

export default WorkIcon
