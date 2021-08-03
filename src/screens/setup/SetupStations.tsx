import React, { Fragment, useState } from 'react'
import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
} from 'react-native'
import { view } from '@risingstack/react-easy-state'
import { View } from '@motify/components'
import Toast from 'react-native-toast-message'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { StationType } from 'src/lib/types'
import { fancyColors, shadow, toastConfig } from 'src/lib/constants'
import { state } from 'src/lib/state'
import RemoveIcon from 'src/icons/RemoveIcon'
import { deleteStation } from 'src/lib/api'
import RoundedButton from 'src/components/RoundedButton'
import { ListWrapper, Text } from 'src/components/styled'

function SetupStations() {
  const [activeIndex, setActiveIndex] = useState(0)

  function onScroll(event: NativeSyntheticEvent<NativeScrollEvent>) {
    const contentOffset = event.nativeEvent.contentOffset
    const index = Math.floor(contentOffset.x / 219)

    if (index !== activeIndex) setActiveIndex(Math.max(index, 0))
  }

  return (
    <ListWrapper>
      <FlatList
        keyExtractor={(item: StationType) => item.station_id}
        data={state.userStations}
        horizontal
        pagingEnabled
        style={{ overflow: 'visible' }}
        onScroll={onScroll}
        snapToInterval={220}
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingRight: 200 }}
        renderItem={({ item, index }: { item: StationType; index: number }) => {
          return (
            <Fragment key={item.station_id}>
              {index === 0 && <View style={{ paddingHorizontal: 10 }} />}
              <TouchableOpacity style={styles.button}>
                <Text>{item.name}</Text>
              </TouchableOpacity>
            </Fragment>
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
            await deleteStation(state.userStations[activeIndex].station_id)

            state.userStations = state.userStations.filter(
              (s: StationType) =>
                s.station_id !== state.userStations[activeIndex].station_id
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
    marginRight: 20,
    borderRadius: 20,
    width: 200,
    alignItems: 'center',
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

export default view(SetupStations)
