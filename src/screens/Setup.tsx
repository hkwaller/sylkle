import React, { useState } from 'react'
import { StyleSheet, SafeAreaView, Dimensions, TextInput } from 'react-native'
import { view } from '@risingstack/react-easy-state'
import { ScrollView } from 'react-native-gesture-handler'
import Toast from 'react-native-toast-message'
import { View } from 'moti'
import { Header, ListWrapper } from 'src/components/styled'
import { StationType } from 'src/lib/types'
import { fancyColors, toastConfig } from 'src/lib/constants'
import RoundedButton from 'src/components/RoundedButton'
import Modal from 'src/components/Modal'
import AddJourneyButton from 'src/components/AddJourneyButton'
import { addJourney } from 'src/lib/api'
import { state } from 'src/lib/state'

const { width } = Dimensions.get('screen')

function Setup() {
  const [text, setText] = useState('')
  const [modalVisible, setModalVisible] = useState(false)
  const [toStation, setToStation] = useState<StationType | undefined>()

  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ marginTop: 20 }}
        >
          <ListWrapper style={{ marginTop: 20 }}>
            <Header style={{ marginLeft: 20, marginBottom: 10 }}>
              Legg til strekning
            </Header>

            <View
              style={{
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                marginHorizontal: 20,
                width: width - 40,
                marginTop: 20,
              }}
            >
              <AddJourneyButton
                title={toStation ? toStation.name : 'Legg til destinasjon'}
                onPress={() => setModalVisible(true)}
              />
            </View>
            {toStation && (
              <TextInput
                style={{
                  height: 60,
                  marginLeft: 20,
                  backgroundColor: '#EEEEEE',
                  width: width - 40,
                  paddingLeft: 20,
                  marginTop: 20,
                  fontSize: 18,
                }}
                placeholder="Navn på din strekning"
                onChangeText={(text) => setText(text)}
                defaultValue={text}
              />
            )}
            {toStation && text.length > 0 ? (
              <View style={{ alignSelf: 'center', marginTop: 30 }}>
                <RoundedButton
                  icon={<View />}
                  title="Legg til strekning"
                  backgroundColor={fancyColors.mint}
                  onPress={async () => {
                    const updatedState: any = await addJourney(
                      toStation?.station_id,
                      text
                    )

                    state.stations = updatedState.stations
                    state.userJourneys = updatedState.userJourneys
                    state.userStations = updatedState.userStations

                    setToStation(undefined)
                    setText('')
                    Toast.show({
                      text1: `Strekningen ${text} er lagt til`,
                      ...toastConfig,
                    })
                  }}
                />
              </View>
            ) : null}
          </ListWrapper>
        </ScrollView>
      </SafeAreaView>
      <Modal
        isVisible={modalVisible}
        onClose={() => {
          setModalVisible(false)
        }}
        selectStation={(station: StationType) => {
          setToStation(station)
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
})

export default view(Setup)
