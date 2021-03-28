import React, { useEffect, useState } from 'react'
import { View } from '@motify/components'
import { Dimensions, Pressable } from 'react-native'
import ModalView from 'react-native-modal'
import { Header, ListWrapper, Text } from './styled'
import { fancyColors } from 'src/lib/constants'
import {
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native-gesture-handler'
import { state } from 'src/lib/state'
import Spacer from './Spacer'
import { Station, Station as StationType } from 'src/lib/types'
import HorizontalStation from './HorizontalStation'

type Props = {
  isVisible: boolean
  onClose: () => void
  selectStation: (station: Station) => void
}

const { width } = Dimensions.get('screen')

function Modal({ isVisible, onClose, selectStation }: Props) {
  const [text, setText] = useState('')
  const [stations, setStations] = useState(state.stations)

  useEffect(() => {
    if (text.length === 0) setStations(state.stations)
    else {
      setStations(
        state.stations.filter((station: Station) => station.name.includes(text))
      )
    }
  }, [text])

  return (
    <ModalView
      isVisible={isVisible}
      onDismiss={onClose}
      swipeDirection={['down']}
      onBackdropPress={onClose}
      onSwipeComplete={onClose}
      style={{
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginBottom: -20,
      }}
    >
      <View
        style={{
          backgroundColor: 'white',
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
                      backgroundColor: fancyColors[item.color],
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
        <TextInput
          style={{ height: 80 }}
          placeholder="Filtrer på stasjoner"
          onChangeText={(text) => setText(text)}
          defaultValue={text}
        />
        <ListWrapper>
          <Header style={{ marginBottom: 12 }}>Stasjoner</Header>
          <FlatList
            keyExtractor={(item: StationType) => item.station_id}
            data={stations}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 200 }}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
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
      </View>
    </ModalView>
  )
}
export default Modal
