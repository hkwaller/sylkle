import React, { Fragment, useState } from 'react'
import { Linking, Pressable, ScrollView, View } from 'react-native'
import { view } from '@risingstack/react-easy-state'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import Spacer from 'src/components/Spacer'
import { Header } from 'src/components/styled'
import Target from 'src/icons/Target'
import { Text } from 'src/components/styled'
import { JourneyType, StationType } from 'src/lib/types'
import { useEffect } from 'react'
import { getNearestStations } from 'src/lib/helpers'
import { state } from 'src/lib/state'
import Station from 'src/components/Station'
import Back from 'src/icons/Back'

type Props = {
  route: any
}

function JourneyDetails(props: Props) {
  const [fromStations, setFromStations] = useState<StationType[]>([])
  const [toStations, setToStations] = useState<StationType[]>([])
  const navigation = useNavigation()
  const journey: JourneyType = props.route.params.journey

  useEffect(() => {
    setFromStations(
      getNearestStations(journey.fromStation, state.stations, 'from')
    )
    setToStations(getNearestStations(journey.toStation, state.stations, 'to'))
  }, [])

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingTop: 80,
        overflow: 'visible',
        paddingBottom: 200,
      }}
    >
      <View style={{ marginLeft: 20, marginBottom: 50 }}>
        <Pressable onPress={() => navigation.goBack()} hitSlop={40}>
          <Back />
        </Pressable>
        <Spacer spacing={20} />
        <Header style={{ marginLeft: 0, fontSize: 30 }}>{journey.name}</Header>
        <View
          style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}
        >
          <Target />
          <Text style={{ marginLeft: 8 }}>{journey.toStation.name}</Text>
        </View>
      </View>
      <Header>Sykler i nærheten av deg</Header>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {fromStations.map((station, index) => {
          return (
            <Fragment key={index}>
              <Spacer spacing={10} horizontal />
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL(`oslobysykkel:stations/${station.station_id}`)
                }}
              >
                <Station index={index} {...{ station }} hideLocks />
              </TouchableOpacity>
            </Fragment>
          )
        })}
      </ScrollView>

      <Spacer spacing={20} />
      <Header>Låser i nærheten av {journey.toStation.name}</Header>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {toStations.map((station, index) => {
          return (
            <Fragment key={index}>
              <Spacer spacing={10} horizontal />
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL(`oslobysykkel:stations/${station.station_id}`)
                }}
              >
                <Station index={index} {...{ station }} hideBikes />
              </TouchableOpacity>
            </Fragment>
          )
        })}
      </ScrollView>
    </ScrollView>
  )
}

export default view(JourneyDetails)
