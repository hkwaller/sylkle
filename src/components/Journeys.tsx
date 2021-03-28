import React, { useState } from 'react'
import {
  FlatList,
  Linking,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native'
import { View } from '@motify/components'
import { UserJourney } from 'src/lib/types'
import { ListWrapper, Header, RowView } from './styled'
import Journey from './Journey'
import { journeyWidth } from 'src/lib/constants'
import RoundedButton from './RoundedButton'
import SwatchIcon from 'src/icons/SwitchIcon'
import { view } from '@risingstack/react-easy-state'
import { state } from 'src/lib/state'

function Journeys() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [flipped, setFlipped] = useState(-1)

  function onScroll(event: NativeSyntheticEvent<NativeScrollEvent>) {
    const contentOffset = event.nativeEvent.contentOffset
    const index = Math.floor(contentOffset.x / (journeyWidth + 20))

    if (index !== activeIndex) setActiveIndex(Math.max(index, 0))
  }

  return (
    <ListWrapper>
      <Header style={{ marginBottom: 16 }}>Strekninger</Header>
      <FlatList
        keyExtractor={(item: UserJourney) =>
          `${item.fromStation.station_id}${item.toStation.station_id}`
        }
        data={state.userJourneys}
        horizontal
        pagingEnabled
        onScroll={onScroll}
        snapToInterval={journeyWidth + 20}
        decelerationRate="fast"
        ItemSeparatorComponent={() => <View style={{ paddingRight: 20 }} />}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingRight: 200 }}
        renderItem={({ item, index }) => {
          return (
            <>
              {index === 0 && <View style={{ paddingHorizontal: 10 }} />}
              <Journey
                journey={item}
                index={index}
                isFlipped={index === flipped}
              />
            </>
          )
        }}
      />
      <RowView
        style={{
          width: journeyWidth,
          justifyContent: 'space-between',
          paddingTop: 12,
          paddingLeft: 20,
        }}
      >
        <RoundedButton
          onPress={() => setFlipped(activeIndex === flipped ? -1 : activeIndex)}
          icon={<SwatchIcon />}
          color={state.userJourneys[activeIndex].color}
        />
        <RoundedButton
          title="Dra hit"
          color={state.userJourneys[activeIndex].color}
          onPress={() =>
            Linking.openURL(
              `oslobysykkel:stations/${
                state.userJourneys[activeIndex][
                  flipped === activeIndex ? 'toStation' : 'fromStation'
                ].station_id
              }`
            )
          }
        />
      </RowView>
    </ListWrapper>
  )
}
export default view(Journeys)
