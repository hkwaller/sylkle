import React, { useState } from 'react'
import { StyleSheet, SafeAreaView } from 'react-native'
import { view } from '@risingstack/react-easy-state'
import { ScrollView } from 'react-native-gesture-handler'
import { View } from 'moti'
import { Header } from 'src/components/styled'
import Modal from 'src/components/Modal'
import { shadow } from 'src/lib/constants'
import SmallRoundedButton from 'src/components/SmallRoundedButton'
import SetupStations from './setup/SetupStations'
import SetupDestinations from './setup/SetupDestinations'

function Setup() {
  const [modalVisible, setModalVisible] = useState(false)

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
              onPress={() => setModalVisible(true)}
            />
          </View>

          <SetupDestinations />
          <SetupStations />
        </ScrollView>
      </SafeAreaView>
      <Modal
        selectStation={() => {}}
        isVisible={modalVisible}
        onClose={() => {
          setModalVisible(false)
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
