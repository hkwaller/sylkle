import React from 'react'
import { FlatList, Text } from 'react-native'
import { View } from '@motify/components'
import { Station } from 'src/lib/types'
import { Header, ListWrapper } from './styled'

type Props = {
  stations: Station[]
}

function NearbyStations({ stations }: Props) {
  return (
    <ListWrapper>
      <Header>Nærmeste stasjoner</Header>
      <FlatList
        keyExtractor={(item: Station) => item.station_id}
        data={stations}
        horizontal
        renderItem={({ item, index }) => {
          return (
            <View
              from={{ translateX: -100 * (index + 1) }}
              animate={{ translateX: 0 }}
            >
              <Text>{item.name}</Text>
            </View>
          )
        }}
      />
    </ListWrapper>
  )
}

export default NearbyStations
