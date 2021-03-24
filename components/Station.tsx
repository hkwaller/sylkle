import React from 'react'
import { Text, StyleSheet } from 'react-native'
import { View } from '@motify/components'
import { Station as StationType } from '../lib/types'

type Props = {
  station: StationType
  index: number
}

const backgroundColors = ['#BDD5D1', '#DFC8B9']

function Station({ station, index }: Props) {
  return (
    <View
      style={[styles.container, { backgroundColor: backgroundColors[index] }]}
      from={{ translateX: -100 * (index + 1) }}
      animate={{ translateX: 0 }}
    >
      <Text>{station.name}</Text>
      <Text>{station.distance}m</Text>
      <Text>
        {station.num_bikes_available} | {station.num_docks_available}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
})

export default Station
