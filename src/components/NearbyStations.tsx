import React, { useState } from 'react'
import {
  FlatList,
  Linking,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native'
import { View } from '@motify/components'
import { Station as StationType } from 'src/lib/types'
import { Header, ListWrapper, RowView } from './styled'
import Station from './Station'
import RoundedButton from './RoundedButton'
import { stationSize } from 'src/lib/constants'
import Spacer from './Spacer'
import { addStation, deleteStation } from 'src/lib/api'
import { state } from 'src/lib/state'
import { view } from '@risingstack/react-easy-state'

function NearbyStations() {
  const [activeIndex, setActiveIndex] = useState(0)

  function onScroll(event: NativeSyntheticEvent<NativeScrollEvent>) {
    const contentOffset = event.nativeEvent.contentOffset
    const index = Math.floor(contentOffset.x / (stationSize + 19))

    if (index !== activeIndex) setActiveIndex(Math.max(index, 0))
  }

  return (
    <ListWrapper>
      <Header style={{ marginBottom: 12 }}>Nærmeste stasjoner</Header>
      <FlatList
        keyExtractor={(item: StationType) => item.station_id}
        data={state.stations.slice(0, 10)}
        horizontal
        pagingEnabled
        onScroll={onScroll}
        snapToInterval={stationSize + 20}
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingRight: 200 }}
        ItemSeparatorComponent={() => <View style={{ paddingRight: 20 }} />}
        renderItem={({ item, index }) => {
          const stationObject =
            state.userStations.find((s) => s.station_id === item.station_id) ||
            item
          return (
            <Station
              station={stationObject}
              index={index}
              black={
                state.userStations
                  .map((us) => us.station_id)
                  .indexOf(item.station_id) === -1
              }
            />
          )
        }}
      />
      <Spacer spacing={6} />
      <RoundedButton
        title="Legg til"
        width={stationSize}
        color={state.stations[activeIndex].color}
        onPress={async () => await addStation(state.stations[activeIndex])}
      />
    </ListWrapper>
  )
}
export default view(NearbyStations)
