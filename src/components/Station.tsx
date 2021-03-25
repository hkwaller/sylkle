import React from 'react'
import { StyleSheet } from 'react-native'
import { View } from '@motify/components'
import { fancyColorsArray } from 'src/lib/constants'
import { Station as StationType } from 'src/lib/types'
import { Text } from './styled'

type Props = {
  station: StationType
  index: number
}

function Station({ station, index }: Props) {
  return (
    <View
      style={[styles.container, { backgroundColor: fancyColorsArray[index] }]}
      from={{ translateX: -100 * (index + 1) }}
      animate={{ translateX: 0 }}
    >
      <Text white>{station.name}</Text>
      <Text white big>
        {station.distance}m
      </Text>
      <Text white medium>
        {station.num_bikes_available} | {station.num_docks_available}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 6,
  },
})

export default Station
