import React from 'react'
import { FlatList, Text } from 'react-native'
import { View } from '@motify/components'
import { Station, UserJourney } from '../lib/types'
import { Header, ListWrapper } from './styled'

type Props = {
  journeys: UserJourney[]
}

function Journeys({ journeys }: Props) {
  return (
    <ListWrapper>
      <Header>Strekninger</Header>
      <FlatList
        keyExtractor={(item: UserJourney) =>
          `${item.fromStation.station_id}${item.toStation.station_id}`
        }
        data={journeys}
        horizontal
        renderItem={({ item, index }) => {
          return (
            <View
              from={{ translateX: -100 * (index + 1) }}
              animate={{ translateX: 0 }}
            >
              <Text>
                {item.fromStation.name} - {item.toStation.name}
              </Text>
            </View>
          )
        }}
      />
    </ListWrapper>
  )
}
export default Journeys
