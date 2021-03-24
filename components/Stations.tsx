import React from 'react'
import { FlatList, Text } from 'react-native'
import { Station as StationType } from '../lib/types'
import { Header, ListWrapper } from './styled'
import Station from './Station'
import { View } from 'moti'

type Props = {
  stations: StationType[]
}

function UserStations({ stations }: Props) {
  return (
    <ListWrapper>
      <Header>Stasjoner</Header>
      <FlatList
        keyExtractor={(item: StationType) => item.station_id}
        data={stations}
        horizontal
        ItemSeparatorComponent={() => <View style={{ marginRight: 20 }} />}
        renderItem={({ item, index }) => {
          return <Station station={item} index={index} />
        }}
      />
    </ListWrapper>
  )
}
export default UserStations
