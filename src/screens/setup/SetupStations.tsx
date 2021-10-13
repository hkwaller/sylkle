import React, { Fragment, useCallback, useState } from 'react'
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
import DraggableFlatList from 'react-native-draggable-flatlist'
import { StationType } from 'src/lib/types'
import { fancyColors, shadow, toastConfig } from 'src/lib/constants'
import { state } from 'src/lib/state'
import RemoveIcon from 'src/icons/RemoveIcon'
import { deleteStation, getStations } from 'src/lib/api'
import RoundedButton from 'src/components/RoundedButton'
import { ListWrapper, Text } from 'src/components/styled'

function SetupStations() {
  const [activeIndex, setActiveIndex] = useState(0)

  function onScroll(event: NativeSyntheticEvent<NativeScrollEvent>) {
    const contentOffset = event.nativeEvent.contentOffset
    const index = Math.floor(contentOffset.x / 219)

    if (index !== activeIndex) setActiveIndex(Math.max(index, 0))
  }

  const renderItem = useCallback(({ item, index, drag, isActive }: any) => {
    return (
      <TouchableOpacity
        style={{
          height: 100,
          backgroundColor: isActive ? 'red' : item.backgroundColor,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onLongPress={drag}
      >
        {index === 0 && <View style={{ paddingHorizontal: 10 }} />}
        <View style={styles.button}>
          <Text>{item.name}</Text>
        </View>
      </TouchableOpacity>
    )
  }, [])

  return (
    <ListWrapper>
      {/* <DraggableFlatList
        horizontal
        data={state.userStations}
        renderItem={renderItem}
        keyExtractor={(item, index) => `draggable-item-${item.key}`}
        onDragEnd={({ data }) => (state.userStations = data)}
      /> */}
      <FlatList
        keyExtractor={(item: StationType) => item.station_id}
        data={state.userStations}
        horizontal
        pagingEnabled
        style={{ overflow: 'visible' }}
        onScroll={onScroll}
        snapToInterval={220}
        decelerationRate="fast"
        ListEmptyComponent={
          <View style={{ flex: 1, width: '80%', padding: 16 }}>
            <Text style={{ flexWrap: 'wrap', flex: 1, width: '80%' }}>
              Du har ingen stasjoner enda. Bruk knappen oppe til høyre
            </Text>
          </View>
        }
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
      {state.userStations.length > 0 ? (
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
              const stationToDelete = state.userStations[activeIndex]
              await deleteStation(stationToDelete.station_id)

              Toast.show({
                text1: `${stationToDelete.name} er tatt bort`,
                ...toastConfig,
              })

              setActiveIndex(Math.max(0, activeIndex - 1))

              await getStations()
            }}
          />
        </View>
      ) : null}
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
