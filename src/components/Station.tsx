import React from 'react'
import { StyleSheet } from 'react-native'
import { View } from '@motify/components'
import { fancyColors, fancyColorsArray, stationWidth } from 'src/lib/constants'
import { Station as StationType } from 'src/lib/types'
import { RowView, Text } from './styled'
import { iconMapper } from 'src/lib/helpers'
import BicycleIcon from 'src/icons/BicycleIcon'
import LockIcon from 'src/icons/LockIcon'

type Props = {
  station: StationType
  index: number
}

function Station({ station, index }: Props) {
  const Icon = iconMapper(station.icon)

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: fancyColors[station.color] },
      ]}
      from={{ translateX: -100 * (index + 1) }}
      animate={{ translateX: 0 }}
    >
      <Text white big medium center>
        {station.name}
      </Text>
      <RowView style={{ paddingTop: 6 }}>
        <Icon color="white" />
        <Text white style={{ paddingHorizontal: 5 }}>
          |
        </Text>
        <Text white big>
          {station.distance}m
        </Text>
      </RowView>
      <RowView style={{ paddingTop: 20 }}>
        <RowView>
          <BicycleIcon color="white" />
          <Text white size={30} style={{ marginLeft: 4 }}>
            {station.num_bikes_available}
          </Text>
        </RowView>
        <View style={{ flex: 1 }} />
        <RowView>
          <Text white size={30} medium style={{ marginRight: 4 }}>
            {station.num_docks_available}
          </Text>
          <LockIcon color="white" />
        </RowView>
      </RowView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    width: stationWidth,
  },
})

export default Station
