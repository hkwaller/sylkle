import React from 'react'
import { Dimensions, FlatList, Linking } from 'react-native'
import { view } from '@risingstack/react-easy-state'
import { TouchableOpacity } from 'react-native-gesture-handler'
import HorizontalStation from 'src/components/HorizontalStation'
import { Header, ListWrapper } from 'src/components/styled'
import { state } from 'src/lib/state'
import { StationType } from 'src/lib/types'

function All() {
  return (
    <ListWrapper style={{ paddingTop: 60 }}>
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
  )
}

export default view(All)
