import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState } from 'react'
import { RefreshControl, SafeAreaView, StyleSheet, Text } from 'react-native'
import * as Location from 'expo-location'
import { useFonts } from 'expo-font'
import { ScrollView, View } from 'moti'
import { getStations, getUser } from './src/lib/api'
import NearbyStations from './src/components/NearbyStations'
import { LocationCoords, Station, UserData } from './src/lib/types'
import Stations from './src/components/Stations'
import Journeys from './src/components/Journeys'
import { AppHeader } from './src/components/styled'
import Spacer from 'src/components/Spacer'
import { colors } from 'src/lib/constants'

export default function App() {
  const [stations, setStations] = useState<Station[]>([])
  const [userData, setUserData] = useState<UserData>()
  const [refreshing, setRefreshing] = useState(false)
  const [location, setLocation] = useState<LocationCoords | undefined>()

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
      setLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      })
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
                const newStations = await getStations(location)
                setStations(newStations)
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
          <Journeys journeys={userData!.journeys} />
          <Spacer spacing={40} />
          <Stations stations={userData!.stations} />
          <Spacer spacing={40} />
          <NearbyStations
            stations={stations}
            userStations={userData.stations}
          />
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
