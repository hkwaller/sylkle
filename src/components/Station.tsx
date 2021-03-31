import React from 'react'
import { StyleSheet } from 'react-native'
import { BlurView } from 'expo-blur'
import { View } from '@motify/components'
import { colors, fancyColors, shadow, stationSize } from 'src/lib/constants'
import { UserStation, Station as StationType } from 'src/lib/types'
import { RowView, Text } from './styled'
import { iconMapper } from 'src/lib/helpers'
import BicycleIcon from 'src/icons/BicycleIcon'
import LockIcon from 'src/icons/LockIcon'

type Props = {
  station: UserStation | StationType
  index: number
  Icon?: React.ReactNode
  noBorder?: boolean
}

function Station({ station, index, Icon, noBorder = false }: Props) {
  return (
    <View
      from={{ translateX: -100 * (index + 1) }}
      animate={{ translateX: 0 }}
      style={{ paddingVertical: 10 }}
    >
      <BlurView intensity={100} style={{ ...shadow }}>
        <View
          style={[
            styles.container,
            { borderWidth: noBorder ? 0 : 1, borderColor: fancyColors.blue },
          ]}
        >
          <View style={{ alignItems: 'center', padding: 20 }}>
            <Text big medium center>
              {station.name}
            </Text>
            <RowView style={{ paddingTop: 6 }}>
              {Icon && (
                <>
                  {Icon}
                  <Text style={{ paddingHorizontal: 5 }}>|</Text>
                </>
              )}
              <Text big>{station.distance}m</Text>
            </RowView>
          </View>
          <RowView
            style={{
              paddingTop: 20,
              backgroundColor: colors.white,
              padding: 20,
            }}
          >
            <RowView>
              <BicycleIcon />
              <Text size={30} style={{ marginLeft: 8 }}>
                {station.num_bikes_available}
              </Text>
            </RowView>
            <View style={{ flex: 1 }} />
            <RowView>
              <Text size={30} medium style={{ marginRight: 8 }}>
                {station.num_docks_available}
              </Text>
              <LockIcon />
            </RowView>
          </RowView>
        </View>
      </BlurView>
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
