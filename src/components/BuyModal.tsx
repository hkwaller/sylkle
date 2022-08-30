import React from 'react'
import { Alert, Dimensions, Pressable, StyleSheet } from 'react-native'
import ModalView from 'react-native-modal'
import { view } from '@risingstack/react-easy-state'
import { SafeAreaView } from 'react-native-safe-area-context'
import { getUniqueId } from 'react-native-device-info'
import Iaphub from 'react-native-iaphub'
import { View } from '@motify/components'
import { Header, Text } from './styled'
import { colors, fancyColors, shadow } from 'src/lib/constants'
import { state } from 'src/lib/state'
import { save } from 'src/lib/helpers'

type Props = {
  isVisible: boolean
  onClose: () => void
}

const { width, height } = Dimensions.get('screen')

function BuyModal({ isVisible, onClose }: Props) {
  return (
    <ModalView
      isVisible={isVisible}
      onDismiss={() => {
        onClose()
      }}
      onBackdropPress={() => {
        onClose()
      }}
      propagateSwipe
      style={{
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginBottom: -20,
        backgroundColor: colors.white,
        marginTop: height / 2,
        marginHorizontal: -20,
      }}
    >
      <View style={{ padding: 20 }}>
        <Header>Kjøp premium</Header>
        <Text style={{ padding: 20, fontSize: 18 }}>
          Dessverre må vi ha noen begrensninger på gratis-versjonen. Du kan ha
          en destinasjon og to favorittstasjoner, men hvis du ønsker flere så må
          du låse opp appen.
        </Text>
      </View>
      <SafeAreaView style={styles.container}>
        <Pressable
          hitSlop={100}
          onPress={async () => {
            const id = getUniqueId()
            await Iaphub.setUserId(id)
            try {
              await Iaphub.buy('sykle_premium', {
                onReceiptProcess: (receipt) => {
                  console.log('Purchase success, processing receipt...')
                },
              })

              Alert.alert(
                'Kjøp gjennomført',
                'Du kan nå bruke appen helt fritt!'
              )

              save('hasPurchased', JSON.stringify(true))
              state.hasPurchased = true
            } catch (e) {
              if (JSON.stringify(e).indexOf('product_already_purchased') > -1) {
                save('hasPurchased', JSON.stringify(true))
                state.hasPurchased = true
              }
              onClose()
              console.log('🚀 ~ file: Start.tsx ~ line 114 ~ onPress={ ~ e', e)
            }
          }}
        >
          <Text big medium>
            Kjøp
          </Text>
        </Pressable>
      </SafeAreaView>
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

export default view(BuyModal)
