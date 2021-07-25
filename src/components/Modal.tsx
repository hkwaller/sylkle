import React, { useEffect, useState } from 'react'
import { View } from '@motify/components'
import { Dimensions, Pressable } from 'react-native'
import ModalView from 'react-native-modal'
import { Header, ListWrapper, Text } from './styled'
import {
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native-gesture-handler'
import { state } from 'src/lib/state'
import Spacer from './Spacer'
import { StationType } from 'src/lib/types'
import HorizontalStation from './HorizontalStation'
import { view } from '@risingstack/react-easy-state'
import { colors, fancyColors } from 'src/lib/constants'
import LocationIcon from 'src/icons/LocationIcon'

type Props = {
  isVisible: boolean
  onClose: () => void
  selectStation: (station: StationType) => void
}

const { width } = Dimensions.get('screen')

function Modal({ isVisible, onClose, selectStation }: Props) {
  const [text, setText] = useState('')
  const [stations, setStations] = useState(state.stations)

  useEffect(() => {
    if (text.length === 0) setStations(state.stations)
    else {
      setStations(
        state.userStations.filter((station: StationType) =>
          station.name.includes(text)
        )
      )
    }
  }, [text])

  return (
    <ModalView
      isVisible={isVisible}
      onDismiss={onClose}
      onBackdropPress={onClose}
      onSwipeComplete={onClose}
      style={{
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginBottom: -20,
      }}
    >
      <ScrollView
        style={{
          backgroundColor: colors.gray,
          width: width,
          flex: 1,
          marginTop: 200,
        }}
      >
        <Pressable
          hitSlop={20}
          onPress={onClose}
          style={{ alignSelf: 'flex-end', margin: 20 }}
        >
          <Text>X</Text>
        </Pressable>
        <ListWrapper>
          <Header>Legg til fra</Header>
          <Spacer spacing={6} />
          <FlatList
            keyExtractor={(item: StationType) => item.station_id}
            data={state.userStations}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingRight: 200 }}
            ItemSeparatorComponent={() => <Spacer horizontal spacing={6} />}
            renderItem={({ item, index }) => {
              return (
                <>
                  {index === 0 && <View style={{ paddingHorizontal: 10 }} />}
                  <TouchableOpacity
                    onPress={() => {
                      selectStation(item)
                      onClose()
                    }}
                    style={{
                      paddingVertical: 10,
                      paddingHorizontal: 20,
                      backgroundColor: fancyColors.blue,
                    }}
                  >
                    <Text white medium>
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                </>
              )
            }}
          />
        </ListWrapper>
        <ListWrapper style={{ alignItems: 'flex-start' }}>
          <TextInput
            style={{
              height: 60,
              marginBottom: 20,
              paddingHorizontal: 20,
              fontSize: 18,
              backgroundColor: 'white',
              width: width - 20,
              marginLeft: 10,
            }}
            placeholder="Filtrer på stasjoner"
            onChangeText={(text) => setText(text)}
            defaultValue={text}
          />
          <Header style={{ marginBottom: 12 }}>Stasjoner</Header>
          <TouchableOpacity
            onPress={() => {}}
            style={{
              flexDirection: 'row',
              padding: 20,
              backgroundColor: colors.white,
              width: width - 20,
              marginBottom: 10,
              marginLeft: 10,
            }}
          >
            <LocationIcon />
            <Text style={{ paddingLeft: 8 }}>Bruk alltid nærmeste stasjon</Text>
          </TouchableOpacity>
          <FlatList
            keyExtractor={(item: StationType) => item.station_id}
            data={stations}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: 200,
              alignItems: 'center',
            }}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
                  style={{ width: width }}
                  onPress={() => {
                    selectStation(item)
                    onClose()
                  }}
                >
                  <HorizontalStation station={item} index={index} />
                </TouchableOpacity>
              )
            }}
          />
          <Spacer spacing={6} />
        </ListWrapper>
      </ScrollView>
    </ModalView>
  )
}

export default view(Modal)
