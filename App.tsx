import React, { useEffect, useState } from 'react'
import { Dimensions, View } from 'react-native'
import { DefaultTheme, NavigationContainer } from '@react-navigation/native'
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
import HomeScreen from 'src/screens/Home'
import SetupScreen from 'src/screens/Setup'
import AllScreen from 'src/screens/All'
import { colors, fancyColors } from 'src/lib/constants'
import TabBarHouse from 'src/icons/TabBarHouse'
import TabBarSettings from 'src/icons/TabBarSettings'
import TabBarAll from 'src/icons/TabBarAll'

const { height } = Dimensions.get('screen')

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
        SansationRegular: require('./assets/fonts/Sansation_Regular.ttf'),
        SansationBold: require('./assets/fonts/Sansation_Bold.ttf'),
      })

      setFontsLoaded(true)
    }

    loadFonts()

    async function get() {
      const { status: locationStatus } =
        await Location.requestPermissionsAsync()
      if (locationStatus !== 'granted') {
        return
      }

      const location = await Location.getCurrentPositionAsync({})
      state.location = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      }

      const updatedState = await getStations(state.location)

      state.stations = updatedState.stations
      state.userJourneys = updatedState.userJourneys
      state.userStations = updatedState.userStations
    }

    get()
  }, [])

  if (!fontsLoaded || state.stations.length === 0) {
    return (
      <SafeAreaView
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          height: height,
        }}
      >
        <Text>Loading...</Text>
      </SafeAreaView>
    )
  }

  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer
        theme={{
          ...DefaultTheme,
          colors: {
            ...DefaultTheme.colors,
            background: 'white',
          },
        }}
      >
        <Tab.Navigator
          initialRouteName="Home"
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color }) => {
              if (route.name === 'Home') {
                return <TabBarHouse color={color} />
              } else if (route.name === 'Setup') {
                return <TabBarSettings color={color} />
              } else if (route.name === 'All') {
                return <TabBarAll color={color} />
              }
            },
          })}
          tabBarOptions={{
            activeTintColor: fancyColors.blue,
            inactiveTintColor: colors.black,
            showLabel: false,
            style: {
              marginBottom: 10,
            },
          }}
        >
          <Tab.Screen name="All" component={AllScreen} />
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Setup" component={SetupScreen} />
        </Tab.Navigator>
        <Toast ref={(ref) => Toast.setRef(ref)} config={toastConfig} />
      </NavigationContainer>
    </>
  )
}

export default view(App)
