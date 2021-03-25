import React, { useState } from 'react'
import { FlatList, NativeScrollEvent, NativeSyntheticEvent } from 'react-native'
import { View } from '@motify/components'
import { Station as StationType } from 'src/lib/types'
import { Header, ListWrapper } from './styled'
import Station from './Station'
import RoundedButton from './RoundedButton'
import { colors, fancyColors, stationWidth } from 'src/lib/constants'
import Spacer from './Spacer'

type Props = {
  stations: StationType[]
}

function Stations({ stations }: Props) {
  const [activeIndex, setActiveIndex] = useState(0)

  function onScroll(event: NativeSyntheticEvent<NativeScrollEvent>) {
    const contentOffset = event.nativeEvent.contentOffset
    const viewSize = event.nativeEvent.layoutMeasurement

    const index = Math.floor(contentOffset.x / (viewSize.width + 20))

    setActiveIndex(Math.max(index, 0))
  }

  return (
    <ListWrapper>
      <Header style={{ marginBottom: 12 }}>Stasjoner</Header>
      <FlatList
        keyExtractor={(item: StationType) => item.station_id}
        data={stations}
        horizontal
        snapToInterval={stationWidth + 20}
        pagingEnabled
        decelerationRate="fast"
        onScroll={onScroll}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingRight: 200 }}
        ItemSeparatorComponent={() => <View style={{ paddingRight: 20 }} />}
        renderItem={({ item, index }) => {
          return <Station station={item} index={index} />
        }}
      />
      <Spacer spacing={6} />
      <RoundedButton
        title="Gå hit"
        color={stations[activeIndex].color}
        width={stationWidth}
      />
    </ListWrapper>
  )
}
export default Stations
