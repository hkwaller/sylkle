import React from 'react'
import { RowView, Text } from 'src/components/styled'
import { View } from 'moti'
import { useNavigation } from '@react-navigation/native'
import Toast from 'react-native-toast-message'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { view } from '@risingstack/react-easy-state'

import { JourneyType } from 'src/lib/types'
import { journeyWidth, shadow, toastConfig } from 'src/lib/constants'
import BicycleIcon from 'src/icons/BicycleIcon'
import LockIcon from 'src/icons/LockIcon'
import Start from 'src/icons/Start'
import ArrowDown from 'src/icons/ArrowDown'
import Target from 'src/icons/Target'
import { deleteJourney, getStations } from 'src/lib/api'
import { state } from 'src/lib/state'
import ArrowIcon from 'src/icons/ArrowIcon'

type Props = {
  journey: JourneyType
  index: number
}

function Journey({ journey, index }: Props) {
  const navigation = useNavigation()
  const { fromStation, toStation } = journey

  return (
    <View
      from={{ translateX: -100 * (index + 1) }}
      animate={{ translateX: 0 }}
      style={{
        width: journeyWidth,
        margin: 10,
        marginLeft: 0,
        backgroundColor: 'white',
        padding: 25,
        borderRadius: 20,
        ...shadow,
      }}
    >
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Details', { journey })
        }}
        onLongPress={async () => {
          await deleteJourney(journey._key)
          Toast.show({
            text1: `Strekningen ${journey.name} er tatt bort`,
            ...toastConfig,
          })

          const updatedState: any = await getStations(state.location)

          state.stations = updatedState.stations
          state.userJourneys = updatedState.userJourneys
          state.userStations = updatedState.userStations
        }}
      >
        <View style={{ position: 'absolute', top: 5, right: 5 }}>
          <ArrowIcon />
        </View>
        <Text big medium>
          {journey.name}
        </Text>
        <RowView style={{ paddingTop: 20, minHeight: 100 }}>
          <View>
            <Start />
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <ArrowDown />
            </View>
            <Target />
          </View>
          <View style={{ marginLeft: 8, flex: 1 }}>
            <Text style={{ transform: [{ translateY: -2 }] }}>
              {fromStation.name}
            </Text>
            <View style={{ flex: 1 }} />
            <View>
              <Text
                style={{
                  transform: [{ translateY: 3 }],
                  ...(journey.updatedToStation && {
                    color: 'gray',
                    textDecorationLine: 'line-through',
                    textDecorationStyle: 'solid',
                  }),
                }}
              >
                {toStation.name}
              </Text>
              {journey.updatedToStation && (
                <Text style={{ transform: [{ translateY: 3 }] }}>
                  {journey.updatedToStation?.name}
                </Text>
              )}
            </View>
          </View>
          <View>
            <RowView style={{ marginTop: -5 }}>
              <BicycleIcon />
              <Text big medium style={{ marginLeft: 8, fontSize: 24 }}>
                {fromStation.num_bikes_available}
              </Text>
            </RowView>
            <View style={{ flex: 1 }} />
            <RowView style={{ marginBottom: -5 }}>
              <LockIcon />
              <Text big medium style={{ marginLeft: 8, fontSize: 24 }}>
                {journey.updatedToStation
                  ? journey.updatedToStation.num_docks_available
                  : toStation.num_docks_available}
              </Text>
            </RowView>
          </View>
        </RowView>
      </TouchableOpacity>
    </View>
  )
}

export default view(Journey)
