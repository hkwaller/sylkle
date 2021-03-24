import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, Text } from 'react-native'
import * as Location from 'expo-location'
import { useFonts } from 'expo-font'
import { View } from 'moti'
import { getStations } from './lib/api'
import NearbyStations from './components/NearbyStations'
import { Station } from './lib/types'

export default function App() {
  const [stations, setStations] = useState<Station[]>([])

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
      setStations(stations)
    }

    get()
  }, [])

  if (!loaded) {
    return null
  }

  return (
    <SafeAreaView style={styles.container}>
      <View
        from={{ opacity: 0, translateY: -20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'spring' }}
      >
        <Text style={styles.header}>Sylkle</Text>
      </View>
      <NearbyStations stations={stations} />
      <StatusBar style="auto" />
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
