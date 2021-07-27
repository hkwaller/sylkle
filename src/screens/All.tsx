import React from 'react'
import { view } from '@risingstack/react-easy-state'
import {
  Dimensions,
  FlatList,
  Linking,
  SafeAreaView,
  StyleSheet,
} from 'react-native'
import HorizontalStation from 'src/components/HorizontalStation'
import { Header, ListWrapper } from 'src/components/styled'
import { state } from 'src/lib/state'
import { StationType } from 'src/lib/types'
import { TouchableOpacity } from 'react-native-gesture-handler'

function All() {
  return (
    <SafeAreaView style={styles.container}>
      <ListWrapper>
        <FlatList
          keyExtractor={(item: StationType) => item.station_id}
          data={state.stations}
          ListHeaderComponent={
            <Header style={{ marginTop: 40 }}>Alle stasjoner</Header>
          }
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 200,
            width: Dimensions.get('screen').width,
          }}
          renderItem={({ item, index }) => {
            const isUserStation =
              state.userStations.filter((s) => s.station_id === item.station_id)
                .length > 0

            return (
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL(`oslobysykkel:stations/${item.station_id}`)
                }}
              >
                <HorizontalStation
                  station={item}
                  index={index}
                  isUserStation={isUserStation}
                />
              </TouchableOpacity>
            )
          }}
        />
      </ListWrapper>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
    flex: 1,
  },
})

export default view(All)
