import React, { useState } from 'react'
import { RefreshControl, StyleSheet } from 'react-native'
import { view } from '@risingstack/react-easy-state'
import { ScrollView } from 'moti'
import * as Location from 'expo-location'
import Spacer from 'src/components/Spacer'
import { state } from 'src/lib/state'
import Journeys from 'src/components/Journeys'
import NearbyStations from 'src/components/NearbyStations'
import Stations from 'src/components/Stations'
import { getStations } from 'src/lib/api'
import LogoBike from 'src/icons/LogoBike'
import { fancyColors } from 'src/lib/constants'

function App() {
  const [refreshing, setRefreshing] = useState(false)

  return (
    <ScrollView
      style={{ paddingTop: 80 }}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={async () => {
            setRefreshing(true)
            const location = await Location.getCurrentPositionAsync({})

            state.location = {
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }

            const updatedState: any = await getStations(state.location)

            state.stations = updatedState.stations
            state.userJourneys = updatedState.userJourneys
            state.userStations = updatedState.userStations

            setRefreshing(false)
          }}
        />
      }
      contentContainerStyle={{
        paddingBottom: 200,
      }}
    >
      <LogoBike color={fancyColors.blue} hideBorder />
      <Spacer spacing={10} />
      {state.userJourneys.length > 0 && <Journeys />}
      {state.userStations.length > 0 && <Stations />}
      {state.stations.length > 0 && <NearbyStations />}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
    flex: 1,
  },
})

export default view(App)
