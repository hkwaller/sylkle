import React, { useState } from 'react'
import {
  FlatList,
  Linking,
  NativeScrollEvent,
  NativeSyntheticEvent,
  TouchableOpacity,
} from 'react-native'
import { View } from '@motify/components'
import { view } from '@risingstack/react-easy-state'
import Toast from 'react-native-toast-message'
import { StationType } from 'src/lib/types'
import { Header, ListWrapper } from './styled'
import Station from './Station'
import RoundedButton from './RoundedButton'
import {
  colors,
  fancyColors,
  stationSize,
  toastConfig,
} from 'src/lib/constants'
import { addStation, deleteStation } from 'src/lib/api'
import { state } from 'src/lib/state'
import HeartIcon from 'src/icons/HeartIcon'
import RemoveIcon from 'src/icons/RemoveIcon'

function NearbyStations() {
  const [activeIndex, setActiveIndex] = useState(0)

  function onScroll(event: NativeSyntheticEvent<NativeScrollEvent>) {
    const contentOffset = event.nativeEvent.contentOffset
    const index = Math.floor(contentOffset.x / (stationSize + 19))

    if (index !== activeIndex) setActiveIndex(Math.max(index, 0))
  }

  const currentlyOnFavourite =
    state.userStations.filter(
      (s) => s.station_id === state.stations[activeIndex].station_id
    ).length > 0

  return (
    <ListWrapper>
      <Header style={{ marginBottom: 12 }}>Nærmeste stasjoner</Header>
      <FlatList
        keyExtractor={(item: StationType) => item.station_id}
        data={state.stations.slice(0, 10)}
        horizontal
        pagingEnabled
        onScroll={onScroll}
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
                  Linking.openURL(
                    `oslobysykkel:stations/${state.userStations[activeIndex].station_id}`
                  )
                }}
              >
                <Station station={item} index={index} />
              </TouchableOpacity>
            </>
          )
        }}
      />
      <View
        style={{
          alignItems: 'flex-start',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginLeft: 20,
          width: stationSize,
        }}
      >
        <RoundedButton
          disabled={currentlyOnFavourite}
          icon={
            <HeartIcon
              color={currentlyOnFavourite ? fancyColors.red : colors.black}
            />
          }
          title="Legg til"
          color={state.stations[activeIndex].color}
          onPress={async () => {
            const t = await addStation(state.stations[activeIndex])
            state.userStations = t
            Toast.show({
              text1: `${state.stations[activeIndex].name} er lagt til`,
              ...toastConfig,
            })
          }}
        />
        <RoundedButton
          disabled={!currentlyOnFavourite}
          icon={
            <RemoveIcon
              color={currentlyOnFavourite ? fancyColors.red : colors.black}
            />
          }
          title="Fjern"
          color={state.stations[activeIndex].color}
          onPress={async () => {
            await deleteStation(state.stations[activeIndex])
            state.userStations = state.userStations.filter(
              (s: StationType) =>
                s.station_id !== state.stations[activeIndex].station_id
            )
            Toast.show({
              text1: `${state.stations[activeIndex].name} er tatt bort til`,
              ...toastConfig,
            })
          }}
        />
      </View>
    </ListWrapper>
  )
}

export default view(NearbyStations)
