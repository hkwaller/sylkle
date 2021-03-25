import React from 'react'
import { View } from 'react-native'

type Props = {
  spacing: number
  horizontal?: boolean
}

function Spacer({ spacing = 3, horizontal }: Props) {
  const margin = horizontal
    ? { marginHorizontal: spacing }
    : { marginVertical: spacing }

  return <View style={margin} />
}

export default Spacer
