import React, { useEffect, useState } from 'react'
import { TextInput, View } from 'react-native'
import { view } from '@risingstack/react-easy-state'
import { FlatList } from 'react-native-gesture-handler'
import HorizontalStation from 'src/components/HorizontalStation'
import Spacer from 'src/components/Spacer'
import { Header, ListWrapper } from 'src/components/styled'
import { state } from 'src/lib/state'
import { Station, Station as StationType } from 'src/lib/types'
import { SafeAreaView } from 'react-native'

function Setup() {
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
    <SafeAreaView>
      <View>
        <Header>Setup</Header>
        <TextInput
          style={{ height: 80 }}
          placeholder="Type here to translate!"
          onChangeText={(text) => setText(text)}
          defaultValue={text}
        />
      </View>
      <ListWrapper>
        <Header style={{ marginBottom: 12 }}>Stasjoner</Header>
        <FlatList
          keyExtractor={(item: StationType) => item.station_id}
          data={stations}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 200 }}
          renderItem={({ item, index }) => {
            return <HorizontalStation station={item} index={index} />
          }}
        />
        <Spacer spacing={6} />
      </ListWrapper>
    </SafeAreaView>
  )
}

export default view(Setup)
