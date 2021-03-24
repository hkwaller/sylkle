import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, Text } from 'react-native'
import * as Location from 'expo-location'
import { useFonts } from 'expo-font'
import { ScrollView, View } from 'moti'
import { getStations, getUser } from './lib/api'
import NearbyStations from './components/NearbyStations'
import { Station, UserData } from './lib/types'
import Stations from './components/Stations'
import Journeys from './components/Journeys'
import { AppHeader } from './components/styled'

export default function App() {
  const [stations, setStations] = useState<Station[]>([])
  const [userData, setUserData] = useState<UserData>()

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

      const stations = await getStations(location)
      const userData = await getUser(stations)
      setStations(stations)
      setUserData(userData)
    }

    get()
  }, [])

  if (!loaded || !userData) {
    return null
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <ScrollView>
        <View
          from={{ opacity: 0, translateY: -20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'spring' }}
        >
          <AppHeader style={styles.header}>Sylkle</AppHeader>
        </View>
        <Stations stations={userData!.stations} />
        <Journeys journeys={userData!.journeys} />
        <NearbyStations stations={stations} />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    margin: 20,
    marginTop: 60,
  },
  header: {
    fontFamily: 'Sansation',
    fontSize: 24,
  },
})
