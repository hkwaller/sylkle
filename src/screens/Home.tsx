import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState } from 'react'
import { RefreshControl, SafeAreaView, StyleSheet } from 'react-native'
import * as Location from 'expo-location'
import { useFonts } from 'expo-font'
import { view } from '@risingstack/react-easy-state'
import { ScrollView, View } from 'moti'
import Spacer from 'src/components/Spacer'
import { colors } from 'src/lib/constants'
import { state } from 'src/lib/state'
import Journeys from 'src/components/Journeys'
import NearbyStations from 'src/components/NearbyStations'
import Stations from 'src/components/Stations'
import { AppHeader } from 'src/components/styled'
import { getStations } from 'src/lib/api'

function App() {
  const [refreshing, setRefreshing] = useState(false)

  return (
    <>
      <StatusBar style="auto" />
      <SafeAreaView style={styles.container}>
        <View
          from={{ opacity: 0, translateY: -20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'spring' }}
          style={{ paddingLeft: 20 }}
        >
          <AppHeader>Sylkle</AppHeader>
        </View>
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
            paddingLeft: 20,
            paddingBottom: 200,
            marginTop: 10,
          }}
        >
          <Spacer spacing={20} />
          {state.userJourneys.length > 0 && <Journeys />}
          <Spacer spacing={40} />
          {state.userStations.length > 0 && <Stations />}
          <Spacer spacing={40} />
          <NearbyStations />
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
