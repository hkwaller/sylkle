import React, { useState } from 'react'
import { FlatList, NativeScrollEvent, NativeSyntheticEvent } from 'react-native'
import { View } from '@motify/components'
import { view } from '@risingstack/react-easy-state'
import Toast from 'react-native-toast-message'
import { Station as StationType } from 'src/lib/types'
import { Header, ListWrapper } from './styled'
import Station from './Station'
import RoundedButton from './RoundedButton'
import { stationSize, toastConfig } from 'src/lib/constants'
import Spacer from './Spacer'
import { addStation } from 'src/lib/api'
import { state } from 'src/lib/state'

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
          return (
            <>
              {index === 0 && <View style={{ paddingHorizontal: 10 }} />}
              <Station station={item} index={index} noBorder />
            </>
          )
        }}
      />
      <Spacer spacing={6} />
      <View style={{ marginLeft: 20 }}>
        <RoundedButton
          title="Legg til"
          width={stationSize}
          color={state.stations[activeIndex].color}
          onPress={async () => {
            await addStation(state.stations[activeIndex])

            Toast.show({
              text1: `${state.stations[activeIndex].name} er lagt til`,
              ...toastConfig,
            })
          }}
        />
      </View>
    </ListWrapper>
  )
}

export default view(NearbyStations)
