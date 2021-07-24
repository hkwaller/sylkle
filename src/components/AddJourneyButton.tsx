import React from 'react'
import { StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Text } from './styled'

type Props = {
  title: string
  onPress: () => void
}

function AddJourneyButton({ title, onPress }: Props) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 40,
    paddingVertical: 10,
    backgroundColor: 'white',
    marginBottom: 12,
  },
})

export default AddJourneyButton
