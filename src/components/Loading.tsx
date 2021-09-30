import React from 'react'
import LottieView from 'lottie-react-native'

function Loading() {
  return (
    <LottieView
      style={{
        width: 200,
        height: 200,
      }}
      autoPlay
      loop
      source={require('./bike.json')}
    />
  )
}

export default Loading
