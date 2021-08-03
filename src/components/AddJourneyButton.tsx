import React from 'react'
import { StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { fancyColors } from 'src/lib/constants'
import { Text } from './styled'

type Props = {
  title: string
  onPress: () => void
}

function AddJourneyButton({ title, onPress }: Props) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text medium>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 40,
    paddingVertical: 10,
    backgroundColor: 'white',
    marginBottom: 12,
    borderColor: fancyColors.blue,
    borderWidth: 2,
  },
})

export default AddJourneyButton
