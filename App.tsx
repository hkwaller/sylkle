import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { view } from '@risingstack/react-easy-state'
import * as Font from 'expo-font'
import * as Location from 'expo-location'
import { SafeAreaView } from '@motify/components'
import Toast from 'react-native-toast-message'
import { StatusBar } from 'expo-status-bar'
import 'react-native-gesture-handler'
import { getStations } from 'src/lib/api'
import { state } from 'src/lib/state'
import { Text } from 'src/components/styled'
import HouseIcon from 'src/icons/HouseIcon'
import GymIcon from 'src/icons/GymIcon'

import HomeScreen from 'src/screens/Home'
import SetupScreen from 'src/screens/Setup'
import { Dimensions } from 'react-native'
import { View } from 'react-native'
import { fancyColors } from 'src/lib/constants'

const toastConfig = {
  success: ({ text1, props, ...rest }: { text1: string; props: any }) => (
    <View
      style={{
        height: 60,
        width: '100%',
        backgroundColor: fancyColors.mint,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text white>{text1}</Text>
      {props.text2 && <Text white>{props.text2}</Text>}
    </View>
  ),
}

const Tab = createBottomTabNavigator()

function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false)

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        Sansation: require('./assets/fonts/Sansation_Regular.ttf'),
        SansationBold: require('./assets/fonts/Sansation_Bold.ttf'),
      })

      setFontsLoaded(true)
    }

    loadFonts()

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

  if (!fontsLoaded) {
    return (
      <SafeAreaView
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          height: Dimensions.get('screen').height,
        }}
      >
        <Text>Loading...</Text>
      </SafeAreaView>
    )
  }

  return (
    <>
      <StatusBar style="auto" />
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
        <Toast ref={(ref) => Toast.setRef(ref)} config={toastConfig} />
      </NavigationContainer>
    </>
  )
}

export default view(App)
