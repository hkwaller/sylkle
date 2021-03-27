import React from 'react'
import { Dimensions, StyleSheet } from 'react-native'
import { View } from '@motify/components'
import { Station } from 'src/lib/types'
import { RowView, Text } from './styled'
import BicycleIcon from 'src/icons/BicycleIcon'
import LockIcon from 'src/icons/LockIcon'
import { AnimatePresence } from 'framer-motion'

type Props = {
  station: Station
  index: number
}

function HorizontalStation({ station, index }: Props) {
  return (
    <View
      style={styles.container}
      from={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <View
        style={{ alignItems: 'flex-start', justifyContent: 'space-between' }}
      >
        <Text big medium center>
          {station.name}
        </Text>
        <Text big>{station.distance}m</Text>
      </View>
      <RowView style={{ paddingTop: 20 }}>
        <RowView>
          <BicycleIcon />
          <Text big medium style={{ marginLeft: 8, width: 20 }}>
            {station.num_bikes_available}
          </Text>
        </RowView>
        <RowView style={{ marginLeft: 20 }}>
          <LockIcon />
          <Text big medium style={{ marginLeft: 8, width: 40 }}>
            {station.num_docks_available}
          </Text>
        </RowView>
      </RowView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: Dimensions.get('screen').width,
  },
})

export default HorizontalStation
