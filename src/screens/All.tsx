import React, { useState } from 'react'
import { Dimensions, FlatList, Linking, RefreshControl } from 'react-native'
import { view } from '@risingstack/react-easy-state'
import { TouchableOpacity } from 'react-native-gesture-handler'
import HorizontalStation from 'src/components/HorizontalStation'
import { Header, ListWrapper } from 'src/components/styled'
import { state } from 'src/lib/state'
import { StationType } from 'src/lib/types'
import { getStations } from 'src/lib/api'

function All() {
  const [refreshing, setRefreshing] = useState(false)

  return (
    <ListWrapper style={{ paddingTop: 60 }}>
      <FlatList
        keyExtractor={(item: StationType) => item.station_id}
        data={state.stations}
        ListHeaderComponent={
          <Header style={{ marginTop: 40 }}>Nærmeste stasjoner</Header>
        }
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={async () => {
              setRefreshing(true)
              const updatedState: any = await getStations(state.location)

              state.stations = updatedState.stations

              setRefreshing(false)
            }}
          />
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 200,
          width: Dimensions.get('screen').width,
        }}
        renderItem={({ item, index }) => {
          const isUserStation =
            state.userStations.filter((s) => s.station_id === item.station_id)
              .length > 0

          return (
            <TouchableOpacity
              onPress={() => {
                Linking.openURL(`oslobysykkel:stations/${item.station_id}`)
              }}
            >
              <HorizontalStation
                station={item}
                index={index}
                isUserStation={isUserStation}
              />
            </TouchableOpacity>
          )
        }}
      />
    </ListWrapper>
  )
}

export default view(All)
