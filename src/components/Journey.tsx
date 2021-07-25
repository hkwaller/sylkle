import React from 'react'
import { Pressable } from 'react-native'
import { RowView, Text } from 'src/components/styled'
import { View } from 'moti'
import { JourneyType } from 'src/lib/types'
import { journeyWidth, shadow } from 'src/lib/constants'
import BicycleIcon from 'src/icons/BicycleIcon'
import LongArrowIcon from 'src/icons/LongArrowIcon'
import LockIcon from 'src/icons/LockIcon'
import Spacer from './Spacer'
import { deleteJourney } from 'src/lib/api'
import LocationIcon from 'src/icons/LocationIcon'
import Start from 'src/icons/Start'
import ArrowDown from 'src/icons/ArrowDown'
import Target from 'src/icons/Target'

type Props = {
  journey: JourneyType
  index: number
  isFlipped: boolean
}

function Journey({ journey, index, isFlipped }: Props) {
  const fromStation = isFlipped ? journey.toStation : journey.fromStation
  const toStation = isFlipped ? journey.fromStation : journey.toStation

  return (
    <View
      from={{ translateX: -100 * (index + 1) }}
      animate={{ translateX: 0 }}
      style={{
        width: journeyWidth,
        margin: 10,
        marginLeft: 0,
        ...shadow,
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 20,
      }}
    >
      <Text big medium>
        {journey.name}
      </Text>
      <RowView style={{ paddingTop: 20 }}>
        <View style={{ justifyContent: 'space-between', height: 100 }}>
          <Start />
          <ArrowDown />
          <Target />
        </View>
        <View style={{ flex: 1, marginLeft: 8 }}>
          <Text style={{ flex: 1 }}>{fromStation.name}</Text>
          <Text>{toStation.name}</Text>
        </View>
        <View style={{ justifyContent: 'space-between', height: 100 }}>
          <RowView>
            <BicycleIcon />
            <Text big style={{ marginLeft: 6 }}>
              {fromStation.num_bikes_available}
            </Text>
          </RowView>
          <RowView>
            <LockIcon />
            <Text big style={{ marginLeft: 6 }}>
              {toStation.num_docks_available}
            </Text>
          </RowView>
        </View>
      </RowView>
      <Pressable
        onPress={() => deleteJourney(journey._key)}
        hitSlop={30}
        style={({ pressed }) => [
          {
            opacity: pressed ? 0.8 : 1,
            position: 'absolute',
            right: 25,
            top: 15,
          },
        ]}
      >
        <Text>X</Text>
      </Pressable>
    </View>
  )
}
export default Journey
