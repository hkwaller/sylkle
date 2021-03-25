import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { View } from 'moti'
import { Text } from 'src/components/styled'
import ArrowIcon from 'src/icons/ArrowIcon'
import { fancyColors } from 'src/lib/constants'

type Props = {
  title?: string
  color: string
  icon?: React.ReactNode
  width?: number
  onPress?: () => void
}

function RoundedButton({ title, color, icon, width, onPress }: Props) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        animate={{ borderColor: fancyColors[color], width: width || undefined }}
        transition={{ type: 'timing', duration: 400 }}
        style={[styles.container]}
      >
        <Text>{title}</Text>
        {icon || <ArrowIcon />}
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 50,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 2,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
})

export default RoundedButton
