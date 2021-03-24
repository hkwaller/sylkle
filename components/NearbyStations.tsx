import React from 'react'
import { FlatList, Text } from 'react-native'
import { View } from '@motify/components'
import { Station } from 'lib/types'

type Props = {
  stations: Station[]
}

function NearbyStations({ stations }: Props) {
  return (
    <FlatList
      keyExtractor={(item: Station) => item.station_id}
      data={stations}
      horizontal
      renderItem={({ item, index }) => {
        return (
          <View from={{ translateX: -100 * index }} animate={{ translateX: 0 }}>
            <Text>{item.name}</Text>
          </View>
        )
      }}
    ></FlatList>
  )
}

export default NearbyStations
