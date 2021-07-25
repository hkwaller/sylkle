import React, { useState } from 'react'
import { RefreshControl, SafeAreaView, StyleSheet } from 'react-native'
import { view } from '@risingstack/react-easy-state'
import { ScrollView } from 'moti'
import Spacer from 'src/components/Spacer'
import { state } from 'src/lib/state'
import Journeys from 'src/components/Journeys'
import NearbyStations from 'src/components/NearbyStations'
import Stations from 'src/components/Stations'
import { getStations } from 'src/lib/api'
import PageHeader from 'src/components/PageHeader'
import AppBackground from 'src/components/AppBackground'

function App() {
  const [refreshing, setRefreshing] = useState(false)

  return (
    <>
      <AppBackground />
      <SafeAreaView style={styles.container}>
        <PageHeader />
        <ScrollView
          style={{ marginTop: 20 }}
          showsVerticalScrollIndicator={false}
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
          }}
        >
          <Spacer spacing={20} />
          {state.userJourneys.length > 0 && <Journeys />}
          {state.userStations.length > 0 && <Stations />}
          {state.stations.length > 0 && <NearbyStations />}
        </ScrollView>
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
    flex: 1,
  },
})

export default view(App)
