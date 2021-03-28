import React, { useState } from 'react'
import { RefreshControl, SafeAreaView, StyleSheet } from 'react-native'
import { view } from '@risingstack/react-easy-state'
import { ScrollView } from 'moti'
import Spacer from 'src/components/Spacer'
import { colors } from 'src/lib/constants'
import { state } from 'src/lib/state'
import Journeys from 'src/components/Journeys'
import NearbyStations from 'src/components/NearbyStations'
import Stations from 'src/components/Stations'
import { getStations } from 'src/lib/api'
import BackgroundLeft from 'src/icons/BackgroundLeft'
import BackgroundRight from 'src/icons/BackgroundRight'
import PageHeader from 'src/components/PageHeader'

function App() {
  const [refreshing, setRefreshing] = useState(false)

  return (
    <>
      <SafeAreaView style={styles.container}>
        <BackgroundLeft />
        <BackgroundRight />
        <PageHeader title="Sylkle" />
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={async () => {
                setRefreshing(true)
                await getStations(state.location)
                setRefreshing(false)
              }}
            />
          }
          contentContainerStyle={{
            paddingBottom: 200,
            marginTop: 10,
          }}
        >
          <Spacer spacing={20} />
          {state.userJourneys.length > 0 && <Journeys />}
          <Spacer spacing={40} />
          {state.userStations.length > 0 && <Stations />}
          <Spacer spacing={40} />
          {state.stations.length > 0 && <NearbyStations />}
        </ScrollView>
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    marginTop: 60,
    flex: 1,
  },
})

export default view(App)
