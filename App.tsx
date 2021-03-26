import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState } from 'react'
import { RefreshControl, SafeAreaView, StyleSheet } from 'react-native'
import * as Location from 'expo-location'
import { useFonts } from 'expo-font'
import { ScrollView, View } from 'moti'
import { getStations } from './src/lib/api'
import NearbyStations from './src/components/NearbyStations'
import { LocationCoords } from './src/lib/types'
import Stations from './src/components/Stations'
import Journeys from './src/components/Journeys'
import { AppHeader } from './src/components/styled'
import Spacer from 'src/components/Spacer'
import { colors } from 'src/lib/constants'
import { state } from 'src/lib/state'
import { view } from '@risingstack/react-easy-state'

function App() {
  const [refreshing, setRefreshing] = useState(false)

  const [loaded] = useFonts({
    Sansation: require('./assets/fonts/Sansation_Regular.ttf'),
    SansationBold: require('./assets/fonts/Sansation_Bold.ttf'),
  })

  useEffect(() => {
    async function get() {
      const {
        status: locationStatus,
      } = await Location.requestPermissionsAsync()
      if (locationStatus !== 'granted') {
        return
      }

      const location = await Location.getCurrentPositionAsync({})
      state.location = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      }

      await getStations(state.location)
    }

    get()
  }, [])

  if (!loaded || state.stations.length === 0) {
    return null
  }

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
