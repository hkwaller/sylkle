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

type Props = {
  journeys: UserJourney[]
}

function Journeys({ journeys }: Props) {
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
        data={journeys}
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
            <Journey
              journey={item}
              index={index}
              isFlipped={index === flipped}
            />
          )
        }}
      />
      <RowView
        style={{
          width: journeyWidth,
          justifyContent: 'space-between',
          paddingTop: 12,
        }}
      >
        <RoundedButton
          onPress={() => setFlipped(activeIndex === flipped ? -1 : activeIndex)}
          icon={<SwatchIcon />}
          color={journeys[activeIndex].color}
        />
        <RoundedButton
          title="Dra hit"
          color={journeys[activeIndex].color}
          onPress={() =>
            Linking.openURL(
              `oslobysykkel:stations/${
                journeys[activeIndex][
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
export default Journeys
