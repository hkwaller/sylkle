import React, { useState } from 'react'
import { RefreshControl } from 'react-native'
import { view } from '@risingstack/react-easy-state'
import * as Location from 'expo-location'
import { ScrollView } from 'moti'
import Spacer from 'src/components/Spacer'
import { state } from 'src/lib/state'
import Journeys from 'src/components/Journeys'
import NearbyStations from 'src/components/NearbyStations'
import Stations from 'src/components/Stations'
import LogoBike from 'src/icons/LogoBike'
import { fancyColors } from 'src/lib/constants'

function App() {
  const [refreshing, setRefreshing] = useState(false)

  return (
    <ScrollView
      style={{ marginTop: 40 }}
      showsVerticalScrollIndicator={false}
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
      contentContainerStyle={{
        paddingBottom: 200,
      }}
    >
      <LogoBike color={fancyColors.blue} hideBorder />
      <Spacer spacing={10} />
      {state.userJourneys?.length > 0 && <Journeys />}
      {state.userStations?.length > 0 && <Stations />}
      {state.stations?.length > 0 && <NearbyStations />}
    </ScrollView>
  )
}

export default view(App)
