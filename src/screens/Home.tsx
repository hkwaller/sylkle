import React, { useState } from 'react'
import { RefreshControl, StyleSheet, Image } from 'react-native'
import { view } from '@risingstack/react-easy-state'
import { ScrollView } from 'moti'
import Spacer from 'src/components/Spacer'
import { state } from 'src/lib/state'
import Journeys from 'src/components/Journeys'
import NearbyStations from 'src/components/NearbyStations'
import Stations from 'src/components/Stations'
import { getStations } from 'src/lib/api'

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
      <Image
        source={require('../../assets/bicycle.png')}
        style={{ marginLeft: 20, width: 50, height: 30 }}
        height={30}
        width={50}
        resizeMode="contain"
      />
      <Spacer spacing={20} />
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
