import React, { useEffect, useState } from 'react'
import { Dimensions, Pressable } from 'react-native'
import ModalView from 'react-native-modal'
import { view } from '@risingstack/react-easy-state'
import { Header, ListWrapper, Text } from './styled'
import {
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native-gesture-handler'
import { state } from 'src/lib/state'
import Spacer from './Spacer'
import { StationType } from 'src/lib/types'
import HorizontalStation from './HorizontalStation'
import { colors, fancyColors } from 'src/lib/constants'

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
        state.stations.filter((station: StationType) =>
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
        backgroundColor: colors.white,
        marginTop: 100,
        marginHorizontal: -20,
      }}
    >
      <Pressable
        hitSlop={20}
        onPress={onClose}
        style={{ alignSelf: 'flex-end', margin: 20 }}
      >
        <Text>X</Text>
      </Pressable>

      <ListWrapper style={{ alignItems: 'flex-start', marginTop: 20 }}>
        <TextInput
          style={{
            height: 60,
            marginBottom: 20,
            paddingHorizontal: 20,
            fontSize: 18,
            backgroundColor: 'white',
            width: width - 50,
            borderWidth: 2,
            alignSelf: 'center',
            borderColor: fancyColors.lightBlue,
          }}
          placeholder="Filtrer på stasjoner"
          onChangeText={(text) => setText(text)}
          defaultValue={text}
        />

        <FlatList
          keyExtractor={(item: StationType) => item.station_id}
          data={stations}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 200,
          }}
          ListHeaderComponent={
            <Header style={{ marginBottom: -8 }}>Stasjoner</Header>
          }
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
    </ModalView>
  )
}

export default view(Modal)
