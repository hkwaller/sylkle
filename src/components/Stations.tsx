import React, { useState } from 'react'
import {
  FlatList,
  Linking,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native'
import { view } from '@risingstack/react-easy-state'
import { View } from '@motify/components'
import Toast from 'react-native-toast-message'
import { StationType } from 'src/lib/types'
import { Header, ListWrapper, RowView, Text } from './styled'
import Station from './Station'
import RoundedButton from './RoundedButton'
import { stationSize, toastConfig } from 'src/lib/constants'
import Spacer from './Spacer'
import { state } from 'src/lib/state'
import { deleteStation } from 'src/lib/api'

function Stations() {
  const [activeIndex, setActiveIndex] = useState(0)

  function onScroll(event: NativeSyntheticEvent<NativeScrollEvent>) {
    const contentOffset = event.nativeEvent.contentOffset
    const index = Math.floor(contentOffset.x / (stationSize + 19))

    if (index !== activeIndex) setActiveIndex(Math.max(index, 0))
  }
  return (
    <ListWrapper>
      <Header style={{ marginBottom: 12 }}>Stasjoner</Header>
      <FlatList
        keyExtractor={(item: StationType) => item.station_id}
        data={state.userStations}
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
              <Station station={item} index={index} />
            </>
          )
        }}
      />
      <Spacer spacing={6} />
      <RowView
        style={{
          width: stationSize,
          justifyContent: 'space-between',
          marginLeft: 20,
        }}
      >
        <RoundedButton
          onPress={async () => {
            const stationToDelete = state.userStations[activeIndex]
            await deleteStation(stationToDelete.station_id)

            Toast.show({
              text1: `${stationToDelete.name} er tatt bort`,
              ...toastConfig,
            })
            setActiveIndex(Math.max(activeIndex - 1, 0))
          }}
          icon={<Text>X</Text>}
        />
        <Spacer horizontal spacing={4} />
        <RoundedButton
          title="Åpne"
          onPress={async () =>
            Linking.openURL(
              `oslobysykkel:stations/${state.userStations[activeIndex].station_id}`
            )
          }
        />
      </RowView>
    </ListWrapper>
  )
}
export default view(Stations)
