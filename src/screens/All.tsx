import React, { useState, useEffect } from 'react'
import { Dimensions, FlatList, Linking, RefreshControl } from 'react-native'
import { view } from '@risingstack/react-easy-state'
import { TouchableOpacity } from 'react-native-gesture-handler'
import * as Location from 'expo-location'
import HorizontalStation from 'src/components/HorizontalStation'
import { Header, ListWrapper } from 'src/components/styled'
import { state } from 'src/lib/state'
import { StationType } from 'src/lib/types'

function All() {
  const [refreshing, setRefreshing] = useState(false)
  const [stations, setStations] = useState<StationType[]>(state.stations)
  const [showOnlyAvailable, setShowOnlyAvailable] = useState(false)

  useEffect(() => {
    if (showOnlyAvailable) {
      const filteredStations = state.stations.filter(
        (station: StationType) => station.num_bikes_available > 0
      )
      setStations(filteredStations)
    } else {
      setStations(state.stations)
    }
  }, [showOnlyAvailable])

  return (
    <ListWrapper style={{ paddingTop: 60 }}>
      <FlatList
        keyExtractor={(item: StationType) => item.station_id}
        data={stations}
        ListHeaderComponent={
          <Header style={{ fontSize: 30, marginTop: 50, marginBottom: 30 }}>
            Nærmeste stasjoner
          </Header>
        }
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={async () => {
              setRefreshing(true)
              state.location = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.Balanced,
              })
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
