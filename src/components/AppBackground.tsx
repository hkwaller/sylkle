import React from 'react'
import { ImageBackground, StyleSheet } from 'react-native'

function AppBackground() {
  return (
    <ImageBackground
      source={require('../../assets/background.png')}
      resizeMode="stretch"
      style={{
        ...StyleSheet.absoluteFillObject,
      }}
    />
  )
}
export default AppBackground
