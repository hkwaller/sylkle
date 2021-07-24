import React, { useState } from 'react'
import { StyleSheet, SafeAreaView, Dimensions, TextInput } from 'react-native'
import { view } from '@risingstack/react-easy-state'
import { ScrollView } from 'react-native-gesture-handler'
import Toast from 'react-native-toast-message'
import { View } from 'moti'
import { Header, ListWrapper } from 'src/components/styled'
import { StationType } from 'src/lib/types'
import PageHeader from 'src/components/PageHeader'
import { colors, fancyColors, toastConfig } from 'src/lib/constants'
import RoundedButton from 'src/components/RoundedButton'
import Modal from 'src/components/Modal'
import AddJourneyButton from 'src/components/AddJourneyButton'
import { addJourney } from 'src/lib/api'
import AppBackground from 'src/components/AppBackground'

const { width } = Dimensions.get('screen')

function Setup() {
  const [text, setText] = useState('')
  const [modalVisible, setModalVisible] = useState(false)
  const [fromStation, setFromStation] = useState<StationType | undefined>()
  const [toStation, setToStation] = useState<StationType | undefined>()

  return (
    <>
      <AppBackground />
      <SafeAreaView style={styles.container}>
        <PageHeader />
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
              }}
            >
              <AddJourneyButton
                title={fromStation ? fromStation.name : 'Fra'}
                onPress={() => setModalVisible(true)}
              />
              <AddJourneyButton
                title={toStation ? toStation.name : 'Til'}
                onPress={() => setModalVisible(true)}
              />
            </View>
            {fromStation && toStation && (
              <TextInput
                style={{
                  height: 60,
                  marginLeft: 20,
                  backgroundColor: 'white',
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
            {fromStation && toStation && text.length > 0 ? (
              <View
                style={{
                  alignSelf: 'flex-end',
                  marginTop: 20,
                  marginRight: 20,
                }}
              >
                <RoundedButton
                  icon={<View />}
                  onPress={() => {
                    addJourney(
                      fromStation.station_id,
                      toStation?.station_id,
                      text
                    )
                    setFromStation(undefined)
                    setToStation(undefined)
                    setText('')
                    Toast.show({
                      text1: `Strekningen ${text} er lagt til`,
                      ...toastConfig,
                    })
                  }}
                  title="Legg til strekning"
                  backgroundColor={fancyColors.mint}
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
          if (!fromStation) setFromStation(station)
          else setToStation(station)
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
