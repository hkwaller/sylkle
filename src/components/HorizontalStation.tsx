import React from 'react'
import { StyleSheet } from 'react-native'
import { View } from '@motify/components'
import { StationType } from 'src/lib/types'
import { RowView, Text } from './styled'
import BicycleIcon from 'src/icons/BicycleIcon'
import LockIcon from 'src/icons/LockIcon'
import { fancyColors, shadow } from 'src/lib/constants'
import HeartIcon from 'src/icons/HeartIcon'

type Props = {
  station: StationType
  index: number
  isUserStation?: boolean
  selected?: boolean
}

function HorizontalStation({
  station,
  isUserStation = false,
  selected = false,
}: Props) {
  return (
    <View
      style={[
        styles.container,
        {
          ...shadow,
          borderWidth: 2,
          borderColor: selected ? fancyColors.blue : 'white',
        },
      ]}
      from={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <View
        style={{
          alignItems: 'flex-start',
          justifyContent: 'space-between',
        }}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text big medium style={{ width: '94%' }}>
            {station.name}
          </Text>
          {isUserStation && <HeartIcon color={fancyColors.darkRed} />}
        </View>
        <Text
          big
          medium
          style={{ color: fancyColors.blue, fontSize: 32, marginVertical: 20 }}
        >
          {station.distance}m
        </Text>
        <RowView>
          <RowView>
            <BicycleIcon />
            <Text big medium style={{ marginLeft: 8 }}>
              {station.num_bikes_available}
            </Text>
          </RowView>
          <RowView style={{ marginLeft: 20 }}>
            <LockIcon />
            <Text big medium style={{ marginLeft: 8 }}>
              {station.num_docks_available}
            </Text>
          </RowView>
        </RowView>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    margin: 20,
    marginBottom: 10,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },
})

export default HorizontalStation
