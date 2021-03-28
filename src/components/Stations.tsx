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
import { Station as StationType, UserStation } from 'src/lib/types'
import { Header, ListWrapper, RowView, Text } from './styled'
import Station from './Station'
import RoundedButton from './RoundedButton'
import { stationSize, toastConfig } from 'src/lib/constants'
import Spacer from './Spacer'
import { state } from 'src/lib/state'
import { deleteStation } from 'src/lib/api'
import { iconMapper } from 'src/lib/helpers'

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
        keyExtractor={(item: UserStation) => item.station_id}
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
          const Icon = iconMapper(item.icon)

          return (
            <>
              {index === 0 && <View style={{ paddingHorizontal: 10 }} />}
              <Station
                station={item}
                index={index}
                Icon={<Icon color="white" />}
              />
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
          title="Gå hit"
          color={state.userStations[activeIndex].color}
          onPress={async () =>
            Linking.openURL(
              `oslobysykkel:stations/${state.userStations[activeIndex].station_id}`
            )
          }
        />
        <RoundedButton
          onPress={async () => {
            await deleteStation(activeIndex)
            Toast.show({
              text1: `${state.stations[activeIndex].name} er tatt bort`,
              ...toastConfig,
            })
            setActiveIndex(activeIndex)
          }}
          icon={<Text>X</Text>}
          color={state.userStations[activeIndex].color}
        />
      </RowView>
    </ListWrapper>
  )
}
export default view(Stations)
