import React, { useEffect, useState } from 'react'
import { Dimensions, Pressable, StyleSheet } from 'react-native'
import ModalView from 'react-native-modal'
import { view } from '@risingstack/react-easy-state'
import {
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import Animated, {
  withSpring,
  withTiming,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated'
import { Header, ListWrapper, Text } from './styled'
import { state } from 'src/lib/state'
import Spacer from './Spacer'
import { StationType } from 'src/lib/types'
import HorizontalStation from './HorizontalStation'
import { colors, fancyColors, shadow, toastConfig } from 'src/lib/constants'
import { addJourney, getStations } from 'src/lib/api'
import Toast from 'react-native-toast-message'

type Props = {
  isVisible: boolean
  onClose: () => void
}

const { width } = Dimensions.get('screen')
const AnimatedSafeArea = Animated.createAnimatedComponent(SafeAreaView)

function DestinationModal({ isVisible, onClose }: Props) {
  const [text, setText] = useState('')
  const [name, setName] = useState('')
  const [selectedStation, setSelectedStation] = useState<
    StationType | undefined
  >()
  const [stations, setStations] = useState(state.stations)
  const y = useSharedValue(1000)

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

  useEffect(() => {
    if (selectedStation) {
      y.value = withTiming(0)
    }
  }, [selectedStation])

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: y.value }],
    }
  })

  function close() {
    setText('')
    setName('')
    setSelectedStation(undefined)
    y.value = withSpring(1000)
  }

  return (
    <ModalView
      isVisible={isVisible}
      onDismiss={() => {
        close()
        onClose()
      }}
      onBackdropPress={() => {
        close()
        onClose()
      }}
      propagateSwipe
      style={{
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginBottom: -20,
        backgroundColor: colors.white,
        marginTop: 100,
        marginHorizontal: -20,
      }}
    >
      <ListWrapper style={{ alignItems: 'flex-start', marginTop: 20 }}>
        <FlatList
          keyExtractor={(item: StationType) => item.station_id}
          data={stations}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 200,
          }}
          ListHeaderComponent={
            <>
              <Header
                style={{
                  marginBottom: 10,
                  marginLeft: stations.length === 0 ? 0 : 20,
                }}
              >
                Navn på reise
              </Header>
              <TextInput
                style={[styles.input, { marginBottom: 20 }]}
                placeholder="Skriv navn. Eg. Jobb, Hjemme"
                placeholderTextColor="#716F81"
                onChangeText={(text) => setName(text)}
                defaultValue={name}
              />
              <Header
                style={{
                  marginBottom: 10,
                  marginLeft: stations.length === 0 ? 0 : 20,
                }}
              >
                Stasjoner
              </Header>
              <TextInput
                style={styles.input}
                placeholder="Filtrer på stasjoner"
                placeholderTextColor="#716F81"
                onChangeText={(text) => setText(text)}
                defaultValue={text}
              />
            </>
          }
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                style={{ width: width }}
                onPress={() => {
                  // selectStation(item)
                  // onClose()
                  setSelectedStation(item)
                }}
              >
                <HorizontalStation
                  station={item}
                  index={index}
                  selected={item.station_id === selectedStation?.station_id}
                />
              </TouchableOpacity>
            )
          }}
        />
        <Spacer spacing={6} />
        <Pressable
          hitSlop={20}
          onPress={onClose}
          style={{
            position: 'absolute',
            top: 10,
            right: 20,
          }}
        >
          <Text big medium>
            X
          </Text>
        </Pressable>
      </ListWrapper>
      <AnimatedSafeArea style={[styles.container, animatedStyle]}>
        <Pressable
          hitSlop={100}
          onPress={async () => {
            if (!selectedStation) return

            await addJourney(selectedStation.station_id, name)
            await getStations()

            Toast.show({
              text1: `Strekningen ${name} er lagt til`,
              ...toastConfig,
            })

            setText('')
            setName('')
            setSelectedStation(undefined)
            y.value = withSpring(1000)

            onClose()
          }}
        >
          <Text big medium>
            Legg til
          </Text>
        </Pressable>
      </AnimatedSafeArea>
    </ModalView>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
    paddingVertical: 30,
    backgroundColor: 'white',
    ...shadow,
  },
  input: {
    height: 60,
    paddingHorizontal: 20,
    fontSize: 18,
    backgroundColor: 'white',
    width: width - 50,
    borderWidth: 2,
    alignSelf: 'center',
    marginBottom: 8,
    borderColor: fancyColors.lightBlue,
    color: colors.black,
  },
})

export default view(DestinationModal)
