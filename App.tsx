import React, { useEffect } from 'react'
import { View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useFonts } from 'expo-font'
import * as Location from 'expo-location'
import { SafeAreaView } from '@motify/components'
import { getStations } from 'src/lib/api'
import { state } from 'src/lib/state'
import { Text } from 'src/components/styled'
import HouseIcon from 'src/icons/HouseIcon'
import GymIcon from 'src/icons/GymIcon'

import HomeScreen from 'src/screens/Home'
import SetupScreen from 'src/screens/Setup'

const Tab = createBottomTabNavigator()

export default function App() {
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
    return (
      <SafeAreaView style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Text>Loading...</Text>
      </SafeAreaView>
    )
  }

  return (
    <NavigationContainer>
      <Tab.Navigator
        sceneContainerStyle={{ backgroundColor: 'white' }}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color }) => {
            if (route.name === 'Home') {
              return <HouseIcon color={color} />
            } else if (route.name === 'Setup') {
              return <GymIcon color={color} />
            }
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Setup" component={SetupScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}
