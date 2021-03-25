import React from 'react'
import { RowView, Text } from 'src/components/styled'
import { View } from 'moti'
import { UserJourney } from 'src/lib/types'
import { fancyColors, journeyWidth } from 'src/lib/constants'
import BicycleIcon from 'src/icons/BicycleIcon'
import LongArrowIcon from 'src/icons/LongArrowIcon'
import LockIcon from 'src/icons/LockIcon'
import Spacer from './Spacer'

type Props = {
  journey: UserJourney
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
        padding: 20,
        backgroundColor: fancyColors[journey.color],
        width: journeyWidth,
      }}
    >
      <View>
        <Text big medium>
          {journey.name}
        </Text>
        <Text medium white>
          {fromStation.name} - {toStation.name}
        </Text>
      </View>
      <RowView style={{ marginTop: 40 }}>
        <BicycleIcon color="white" />
        <Text big white style={{ marginLeft: 6 }}>
          {fromStation.num_bikes_available}
        </Text>
        <Spacer horizontal spacing={6} />
        <LongArrowIcon />
        <Spacer horizontal spacing={6} />
        <LockIcon color="white" />
        <Text big white style={{ marginLeft: 6 }}>
          {toStation.num_docks_available}
        </Text>
      </RowView>
    </View>
  )
}
export default Journey
