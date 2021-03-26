import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { View } from 'moti'
import { Text } from 'src/components/styled'
import {
  State,
  TapGestureHandler,
  TapGestureHandlerGestureEvent,
} from 'react-native-gesture-handler'
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'
import ArrowIcon from 'src/icons/ArrowIcon'
import { fancyColors } from 'src/lib/constants'

type Props = {
  title?: string
  color: string
  icon?: React.ReactNode
  width?: number
  onPress?: () => void
}

function RoundedButton({ title, color, icon, width, onPress }: Props) {
  const buttonScale = useSharedValue(1)

  const gestureHandler = useAnimatedGestureHandler<
    TapGestureHandlerGestureEvent,
    { buttonScale: Animated.SharedValue<number> }
  >({
    onStart: () => {
      buttonScale.value = 0.9
    },
    onCancel: () => {
      buttonScale.value = 1
      onPress && runOnJS(onPress)
    },
    onEnd: () => {
      buttonScale.value = 1
      onPress && runOnJS(onPress)
    },
  })

  const style = useAnimatedStyle(() => {
    return {
      transform: [{ scale: withSpring(buttonScale.value) }],
    }
  })

  return (
    <TapGestureHandler
      onGestureEvent={gestureHandler}
      onHandlerStateChange={(event) => {
        if (event.nativeEvent.state === State.END) onPress?.()
      }}
    >
      <Animated.View style={style}>
        <View
          animate={{
            borderColor: fancyColors[color],
            width: width || undefined,
          }}
          transition={{ type: 'timing', duration: 400 }}
          style={[styles.container]}
        >
          <Text>{title}</Text>
          {icon || <ArrowIcon />}
        </View>
      </Animated.View>
    </TapGestureHandler>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 50,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 2,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
})

export default RoundedButton
