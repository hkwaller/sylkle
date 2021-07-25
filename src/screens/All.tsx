import React from 'react'
import { view } from '@risingstack/react-easy-state'
import { Dimensions, FlatList, SafeAreaView, StyleSheet } from 'react-native'
import HorizontalStation from 'src/components/HorizontalStation'
import { ListWrapper } from 'src/components/styled'
import { state } from 'src/lib/state'
import { StationType } from 'src/lib/types'

function All() {
  return (
    <>
      <SafeAreaView style={styles.container}>
        <ListWrapper style={{ marginTop: 40 }}>
          <FlatList
            keyExtractor={(item: StationType) => item.station_id}
            data={state.stations}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: 200,
              width: Dimensions.get('screen').width,
            }}
            renderItem={({ item, index }) => {
              return <HorizontalStation station={item} index={index} />
            }}
          />
        </ListWrapper>
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
    flex: 1,
  },
})

export default view(All)
