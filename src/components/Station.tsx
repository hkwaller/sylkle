import React from 'react'
import { StyleSheet } from 'react-native'
import { View } from '@motify/components'
import { colors, fancyColors, shadow, stationSize } from 'src/lib/constants'
import { StationType } from 'src/lib/types'
import { RowView, Text } from './styled'
import BicycleIcon from 'src/icons/BicycleIcon'
import LockIcon from 'src/icons/LockIcon'
import Spacer from './Spacer'

type Props = {
  station: StationType
  index: number
  isUserStation?: boolean
}

function Station({ station, index, isUserStation = false }: Props) {
  return (
    <View
      from={{ translateX: -100 * (index + 1) }}
      animate={{ translateX: 0 }}
      style={{ paddingVertical: 10, width: stationSize }}
    >
      <View
        style={[
          styles.container,
          {
            backgroundColor: colors.white,
            borderRadius: 20,
            ...shadow,
          },
        ]}
      >
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 20,
          }}
        >
          <Text big center>
            {station.name}
          </Text>
        </View>
        <Text big medium style={{ color: fancyColors.blue, fontSize: 32 }}>
          {station.distance}m
        </Text>
        <RowView
          style={{
            paddingTop: 20,
            padding: 20,
          }}
        >
          <RowView>
            <BicycleIcon />
            <Text size={30} medium style={{ marginLeft: 8 }}>
              {station.num_bikes_available}
            </Text>
          </RowView>
          <Spacer horizontal spacing={20} />
          <RowView>
            <Text size={30} medium style={{ marginRight: 8 }}>
              {station.num_docks_available}
            </Text>
            <LockIcon />
          </RowView>
        </RowView>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    minWidth: stationSize,
    maxWidth: stationSize + 20,
    justifyContent: 'space-between',
  },
})

export default Station
