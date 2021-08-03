import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { view } from '@risingstack/react-easy-state'
import { fancyColors, shadow } from 'src/lib/constants'
import { Text } from 'src//components/styled'

function AddJourney() {
  return (
    <TouchableOpacity
      style={{
        margin: 10,
        marginLeft: 20,
        backgroundColor: 'white',
        padding: 25,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        ...shadow,
      }}
    >
      <Text medium big style={{ color: fancyColors.blue }}>
        Legg til destinasjon
      </Text>
    </TouchableOpacity>
  )
}

export default view(AddJourney)
