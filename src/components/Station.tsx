import React from 'react'
import { StyleSheet } from 'react-native'
import { View } from '@motify/components'
import { fancyColors, stationSize } from 'src/lib/constants'
import { UserStation, Station as StationType } from 'src/lib/types'
import { RowView, Text } from './styled'
import { iconMapper } from 'src/lib/helpers'
import BicycleIcon from 'src/icons/BicycleIcon'
import LockIcon from 'src/icons/LockIcon'

type Props = {
  station: UserStation | StationType
  index: number
  black?: boolean
  Icon?: React.ReactNode
}

function Station({ station, index, black, Icon }: Props) {
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: fancyColors[station.color],
          borderColor: fancyColors[station.color],
        },
      ]}
      from={{ translateX: -100 * (index + 1) }}
      animate={{ translateX: 0 }}
    >
      <View style={{ alignItems: 'center' }}>
        <Text white={!black} big medium center>
          {station.name}
        </Text>
        <RowView style={{ paddingTop: 6 }}>
          {!black && (
            <>
              {Icon}
              <Text white style={{ paddingHorizontal: 5 }}>
                |
              </Text>
            </>
          )}
          <Text white={!black} big>
            {station.distance}m
          </Text>
        </RowView>
      </View>
      <RowView style={{ paddingTop: 20 }}>
        <RowView>
          <BicycleIcon color={!black ? 'white' : undefined} />
          <Text white={!black} size={30} style={{ marginLeft: 8 }}>
            {station.num_bikes_available}
          </Text>
        </RowView>
        <View style={{ flex: 1 }} />
        <RowView>
          <Text white={!black} size={30} medium style={{ marginRight: 8 }}>
            {station.num_docks_available}
          </Text>
          <LockIcon color={!black ? 'white' : undefined} />
        </RowView>
      </RowView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    width: stationSize,
    height: stationSize,
    borderWidth: 2,
    justifyContent: 'space-between',
  },
})

export default Station
