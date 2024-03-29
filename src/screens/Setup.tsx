import React, { useState } from 'react'
import { StyleSheet, SafeAreaView } from 'react-native'
import { view } from '@risingstack/react-easy-state'
import { ScrollView } from 'react-native-gesture-handler'
import { View } from 'moti'
import { Header } from 'src/components/styled'
import DestinationModal from 'src/components/DestinationModal'
import { shadow } from 'src/lib/constants'
import SmallRoundedButton from 'src/components/SmallRoundedButton'
import SetupStations from './setup/SetupStations'
import SetupDestinations from './setup/SetupDestinations'
import StationModal from 'src/components/StationModal'
import BuyModal from 'src/components/BuyModal'
import { state } from 'src/lib/state'

function Setup() {
  const [modalVisible, setModalVisible] = useState(false)
  const [buyModalVisible, setBuyModalVisible] = useState(false)
  const [stationModalVisible, setStationModalVisible] = useState(false)

  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Header style={{ fontSize: 30, marginTop: 50, marginBottom: 30 }}>
            Innstillinger
          </Header>
          <View style={styles.headerContainer}>
            <Header style={styles.scrollHeader}>Dine destinasjoner</Header>

            <SmallRoundedButton
              title="Legg til"
              onPress={() => {
                if (!state.hasPurchased && state.storedJourneys.length > 1) {
                  setBuyModalVisible(true)
                } else {
                  setModalVisible(true)
                }
              }}
            />
          </View>

          <SetupDestinations />

          <View style={styles.headerContainer}>
            <Header style={styles.scrollHeader}>Dine stasjoner</Header>

            <SmallRoundedButton
              title="Legg til"
              onPress={() => {
                if (!state.hasPurchased && state.storedStations.length > 2) {
                  setBuyModalVisible(true)
                } else {
                  setStationModalVisible(true)
                }
              }}
            />
          </View>

          <SetupStations />
        </ScrollView>
      </SafeAreaView>
      <BuyModal
        isVisible={buyModalVisible}
        onClose={() => setBuyModalVisible(false)}
      />
      <DestinationModal
        isVisible={modalVisible}
        onClose={() => {
          setModalVisible(false)
        }}
      />
      <StationModal
        isVisible={stationModalVisible}
        onClose={() => {
          setStationModalVisible(false)
        }}
      />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
    flex: 1,
  },
  button: {
    ...shadow,
    padding: 30,
    backgroundColor: 'white',
    marginRight: 20,
    borderRadius: 20,
  },
  scrollContainer: { overflow: 'visible', marginTop: 20, marginBottom: 20 },
  scrollHeader: { fontSize: 20 },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 40,
    marginRight: 20,
  },
})

export default view(Setup)
