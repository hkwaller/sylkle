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
import { TouchableOpacity } from 'react-native-gesture-handler'
import { StationType } from 'src/lib/types'
import { Header, ListWrapper } from './styled'
import Station from './Station'
import { fancyColors, stationSize, toastConfig } from 'src/lib/constants'
import { state } from 'src/lib/state'
import RoundedButton from './RoundedButton'
import RemoveIcon from 'src/icons/RemoveIcon'
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
      <Header style={{ marginBottom: 12 }}>Dine stasjoner</Header>
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
          justifyContent: 'flex-end',
          marginLeft: 20,
          width: stationSize,
        }}
      >
        <RoundedButton
          icon={<RemoveIcon color={fancyColors.red} />}
          title="Fjern"
          color={state.stations[activeIndex].color}
          onPress={async () => {
            await deleteStation(state.userStations[activeIndex].station_id)

            state.userStations = state.userStations.filter(
              (s: StationType) =>
                s.station_id !== state.userStations[activeIndex].station_id
            )

            Toast.show({
              text1: `${state.userStations[activeIndex].name} er tatt bort`,
              ...toastConfig,
            })

            setActiveIndex(Math.max(0, activeIndex - 1))
          }}
        />
      </View>
    </ListWrapper>
  )
}
export default view(Stations)
