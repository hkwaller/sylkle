import React from 'react'
import { Pressable } from 'react-native'
import { BlurView } from 'expo-blur'
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
      }}
    >
      <BlurView
        intensity={100}
        style={{ padding: 20, borderRadius: 16, ...shadow }}
      >
        <Pressable
          onPress={() => deleteJourney(journey._key)}
          hitSlop={30}
          style={({ pressed }) => [
            {
              opacity: pressed ? 0.8 : 1,
              position: 'absolute',
              right: 15,
              top: 10,
            },
          ]}
        >
          <Text>X</Text>
        </Pressable>
        <View>
          <RowView>
            <Text big medium>
              {journey.name}
            </Text>
            {journey.fromClosest && (
              <>
                <Spacer horizontal spacing={4} />
                <LocationIcon />
              </>
            )}
          </RowView>
          <Text>
            {fromStation.name} - {toStation.name}
          </Text>
        </View>
        <RowView style={{ marginTop: 40 }}>
          <BicycleIcon />
          <Text big style={{ marginLeft: 6 }}>
            {fromStation.num_bikes_available}
          </Text>
          <Spacer horizontal spacing={6} />
          <LongArrowIcon />
          <Spacer horizontal spacing={6} />
          <LockIcon />
          <Text big style={{ marginLeft: 6 }}>
            {toStation.num_docks_available}
          </Text>
        </RowView>
      </BlurView>
    </View>
  )
}
export default Journey
