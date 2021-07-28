import React, { Fragment, useState } from 'react'
import { Image, ScrollView, View } from 'react-native'
import Spacer from 'src/components/Spacer'
import { Header } from 'src/components/styled'
import Target from 'src/icons/Target'
import { Text } from 'src/components/styled'
import { JourneyType, StationType } from 'src/lib/types'
import { useEffect } from 'react'
import { getNearestStations } from 'src/lib/helpers'
import { state } from 'src/lib/state'
import { view } from '@risingstack/react-easy-state'
import Station from 'src/components/Station'

type Props = {}

function JourneyDetails(props: Props) {
  const [fromStations, setFromStations] = useState<StationType[]>([])
  const [toStations, setToStations] = useState<StationType[]>([])

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
        <Image
          source={require('../../assets/bicycle.png')}
          style={{ width: 50, height: 30 }}
          height={30}
          width={50}
          resizeMode="contain"
        />
        <Spacer spacing={20} />
        <Header style={{ marginLeft: 0, fontSize: 30 }}>{journey.name}</Header>
        <View
          style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}
        >
          <Target />
          <Text style={{ marginLeft: 8 }}>{journey.toStation.name}</Text>
        </View>
      </View>
      <Header>Steder rundt deg som har sykler</Header>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {fromStations.map((station, index) => {
          return (
            <Fragment key={index}>
              <Spacer spacing={10} horizontal />
              <Station index={index} {...{ station }} />
            </Fragment>
          )
        })}
      </ScrollView>

      <Spacer spacing={20} />
      <Header>Steder rundt {journey.toStation.name} som har sykler</Header>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {toStations.map((station, index) => {
          return (
            <Fragment key={index}>
              <Spacer spacing={10} horizontal />
              <Station index={index} {...{ station }} />
            </Fragment>
          )
        })}
      </ScrollView>
    </ScrollView>
  )
}
export default view(JourneyDetails)
