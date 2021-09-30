import React from 'react'
import { FlatList, Linking, TouchableOpacity } from 'react-native'
import { View } from '@motify/components'
import { view } from '@risingstack/react-easy-state'
import { StationType } from 'src/lib/types'
import { Header, ListWrapper } from './styled'
import Station from './Station'
import { stationSize } from 'src/lib/constants'
import { state } from 'src/lib/state'
import Spacer from './Spacer'

function NearbyStations() {
  return (
    <ListWrapper>
      <Spacer spacing={10} />
      <Header style={{ marginBottom: 6 }}>Nærmeste stasjoner</Header>
      <FlatList
        keyExtractor={(item: StationType) => item.station_id}
        data={state.stations.slice(0, 10)}
        horizontal
        pagingEnabled
        decelerationRate="fast"
        snapToInterval={stationSize + 20}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingRight: 200 }}
        ItemSeparatorComponent={() => <View style={{ paddingRight: 20 }} />}
        renderItem={({ item, index }) => {
          return (
            <>
              {index === 0 && <View style={{ paddingHorizontal: 10 }} />}
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL(`oslobysykkel:stations/${item.station_id}`)
                }}
              >
                <Station station={item} index={index} />
              </TouchableOpacity>
            </>
          )
        }}
      />
    </ListWrapper>
  )
}

export default view(NearbyStations)
