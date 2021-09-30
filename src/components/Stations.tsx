import React from 'react'
import { FlatList, Linking } from 'react-native'
import { view } from '@risingstack/react-easy-state'
import { View } from '@motify/components'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { StationType } from 'src/lib/types'
import { Header, ListWrapper } from './styled'
import Station from './Station'
import { stationSize } from 'src/lib/constants'
import { state } from 'src/lib/state'
import Spacer from './Spacer'

function Stations() {
  return (
    <ListWrapper>
      <Spacer spacing={10} />
      <Header style={{ marginBottom: 6 }}>Dine stasjoner</Header>
      <FlatList
        keyExtractor={(item: StationType) => item.station_id}
        data={state.userStations}
        horizontal
        pagingEnabled
        snapToInterval={stationSize + 20}
        decelerationRate="fast"
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

export default view(Stations)
