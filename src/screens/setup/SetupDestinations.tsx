import React, { useState } from 'react'
import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import { View } from '@motify/components'
import { view } from '@risingstack/react-easy-state'
import Toast from 'react-native-toast-message'
import { JourneyType } from 'src/lib/types'
import { fancyColors, shadow, toastConfig } from 'src/lib/constants'
import { state } from 'src/lib/state'
import { Header, ListWrapper, Text } from 'src/components/styled'
import RoundedButton from 'src/components/RoundedButton'
import { deleteJourney } from 'src/lib/api'
import RemoveIcon from 'src/icons/RemoveIcon'

function SetupJourneys() {
  const [activeIndex, setActiveIndex] = useState(0)

  function onScroll(event: NativeSyntheticEvent<NativeScrollEvent>) {
    const contentOffset = event.nativeEvent.contentOffset
    const index = Math.floor(contentOffset.x / 220)

    if (index !== activeIndex) setActiveIndex(Math.max(index, 0))
  }

  return (
    <ListWrapper>
      <FlatList
        keyExtractor={(item: JourneyType) => `${item._key}`}
        data={state.userJourneys}
        horizontal
        pagingEnabled
        style={{ overflow: 'visible' }}
        onScroll={onScroll}
        snapToInterval={220}
        decelerationRate="fast"
        ListEmptyComponent={<Text>Legg til strekninger</Text>}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingRight: 200 }}
        renderItem={({ item }) => {
          return (
            <>
              <View style={{ paddingLeft: 20 }} />
              <TouchableOpacity style={styles.button}>
                <Header style={{ marginLeft: 0 }}>{item.name}</Header>
                <Text>{item.toStation.name}</Text>
              </TouchableOpacity>
            </>
          )
        }}
      />
      <View
        style={{
          alignItems: 'flex-start',
          flexDirection: 'row',
          marginLeft: 20,
          width: 200,
          marginTop: 10,
        }}
      >
        <RoundedButton
          icon={<RemoveIcon color={fancyColors.black} />}
          title="Fjern"
          onPress={async () => {
            await deleteJourney(state.userJourneys[activeIndex]._key)

            state.userJourneys = state.userJourneys.filter(
              (j: JourneyType) =>
                j._key !== state.userJourneys[activeIndex]._key
            )

            Toast.show({
              text1: `${state.userStations[activeIndex].name} er tatt bort`,
              ...toastConfig,
            })

            setActiveIndex(Math.max(0, activeIndex - 1))
          }}
        />
      </View>
    </ListWrapper>
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
    borderRadius: 20,
    minWidth: 200,
  },
  scrollContainer: { overflow: 'visible', marginTop: 20, marginBottom: 20 },
  scrollHeader: { fontSize: 20 },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 40,
    marginRight: 20,
    marginBottom: 10,
  },
})

export default view(SetupJourneys)
