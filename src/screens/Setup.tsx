import React, { useState } from 'react'
import { StyleSheet, SafeAreaView, Dimensions } from 'react-native'
import { view } from '@risingstack/react-easy-state'
import { Header, ListWrapper } from 'src/components/styled'
import { Station, Station as StationType } from 'src/lib/types'
import BackgroundLeft from 'src/icons/BackgroundLeft'
import BackgroundRight from 'src/icons/BackgroundRight'
import PageHeader from 'src/components/PageHeader'
import { colors, fancyColors } from 'src/lib/constants'
import { View } from 'moti'
import RoundedButton from 'src/components/RoundedButton'
import Modal from 'src/components/Modal'
import AddJourneyButton from 'src/components/AddJourneyButton'
import { addJourney } from 'src/lib/api'

const { width } = Dimensions.get('screen')

function Setup() {
  const [modalVisible, setModalVisible] = useState(false)
  const [fromStation, setFromStation] = useState<StationType | undefined>()
  const [toStation, setToStation] = useState<StationType | undefined>()

  return (
    <>
      <SafeAreaView style={styles.container}>
        <BackgroundLeft />
        <BackgroundRight />
        <PageHeader title="Setup" color={fancyColors.mint} />
        <ListWrapper style={{ marginTop: 20 }}>
          <Header style={{ marginLeft: 20, marginBottom: 10 }}>
            Legg til strekning
          </Header>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginHorizontal: 20,
            }}
          >
            <AddJourneyButton
              title={fromStation ? fromStation.name : 'Fra'}
              onPress={() => setModalVisible(true)}
            />
            <AddJourneyButton
              title={toStation ? toStation.name : 'Fra'}
              onPress={() => setModalVisible(true)}
            />
          </View>
          {fromStation && toStation ? (
            <View style={{ alignSelf: 'flex-end', marginTop: 20 }}>
              <RoundedButton
                icon={<View />}
                onPress={() => {
                  addJourney(fromStation.station_id, toStation?.station_id)
                  setFromStation(undefined)
                  setToStation(undefined)
                }}
                title="Legg til strekning"
                backgroundColor={fancyColors.mint}
              />
            </View>
          ) : null}
        </ListWrapper>
      </SafeAreaView>
      <Modal
        isVisible={modalVisible}
        onClose={() => {
          setModalVisible(false)
        }}
        selectStation={(station: Station) => {
          if (!fromStation) setFromStation(station)
          else setToStation(station)
        }}
      />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    marginTop: 60,
    flex: 1,
  },
})

export default view(Setup)
