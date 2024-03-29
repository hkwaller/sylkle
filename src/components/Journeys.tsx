import React, { useState, useEffect } from 'react'
import {
  FlatList,
  Linking,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native'
import { View } from '@motify/components'
import { view } from '@risingstack/react-easy-state'
import { JourneyType, StationType } from 'src/lib/types'
import { ListWrapper, Header, RowView } from './styled'
import Journey from './Journey'
import { journeyWidth } from 'src/lib/constants'
import RoundedButton from './RoundedButton'
import { state } from 'src/lib/state'
import Start from 'src/icons/Start'
import Target from 'src/icons/Target'
import { Text } from 'src/components/styled'
import AddJourney from './AddJourney'

function Journeys() {
  const [journeys, setJourneys] = useState<{
    visible: JourneyType[]
    hidden: JourneyType[]
  }>()

  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const filteredJourneys = state.userJourneys.reduce(
      (acc, val: JourneyType) => {
        if (val.fromStation.name === val.toStation.name) {
          acc.hidden.push(val)
        } else {
          acc.visible.push(val)
        }

        return acc
      },
      {
        visible: [],
        hidden: [],
      }
    )
    setJourneys(filteredJourneys)
  }, [state.userJourneys])

  function onScroll(event: NativeSyntheticEvent<NativeScrollEvent>) {
    const contentOffset = event.nativeEvent.contentOffset
    const index = Math.floor(contentOffset.x / (journeyWidth + 20))

    if (index !== activeIndex) setActiveIndex(Math.max(index, 0))
  }

  return (
    <ListWrapper>
      <View style={{ flexDirection: 'row' }}>
        <Header>Destinasjoner</Header>
        <Text style={{ marginLeft: 6 }}>
          {(journeys?.hidden?.length || 0) > 0 &&
            `(${journeys?.hidden[0].name} gjemt)`}
        </Text>
      </View>
      <FlatList
        keyExtractor={(item: JourneyType, index) =>
          `${item.fromStation.station_id}${item.toStation.station_id}${index}`
        }
        data={journeys?.visible}
        horizontal
        pagingEnabled
        onScroll={onScroll}
        snapToInterval={330}
        decelerationRate="fast"
        ListEmptyComponent={<AddJourney />}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingRight: 200 }}
        renderItem={({ item, index }) => {
          return (
            <>
              <View style={{ paddingLeft: 20 }} />
              <Journey journey={item} index={index} />
            </>
          )
        }}
      />
      {(journeys?.visible.length || 0) > 0 && (
        <RowView
          style={{
            width: journeyWidth + 20,
            justifyContent: 'space-between',
            paddingTop: 6,
            paddingLeft: 20,
          }}
        >
          <RoundedButton
            title="Åpne"
            icon={<Start />}
            onPress={() => {
              Linking.openURL(
                `oslobysykkel:stations/${journeys?.visible[activeIndex]['fromStation'].station_id}`
              )
            }}
          />

          <RoundedButton
            title="Åpne"
            icon={<Target />}
            onPress={() => {
              const stationToOpen = journeys?.visible[activeIndex][
                'updatedToStation'
              ]
                ? 'updatedToStation'
                : 'toStation'

              Linking.openURL(
                `oslobysykkel:stations/${
                  (journeys?.visible[activeIndex][stationToOpen] as StationType)
                    .station_id
                }`
              )
            }}
          />
        </RowView>
      )}
    </ListWrapper>
  )
}

export default view(Journeys)
