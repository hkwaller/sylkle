import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { Text } from 'src/components/styled'
import { colors, fancyColors } from 'src/lib/constants'

type Props = {
  onPress: () => void
  title: string
}

function SmallRoundedButton({ onPress, title }: Props) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
    paddingVertical: 8,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: fancyColors.blue,
    justifyContent: 'center',
  },
})

export default SmallRoundedButton
