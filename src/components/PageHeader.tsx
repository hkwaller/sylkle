import React from 'react'
import { View } from 'moti'
import Logo from 'src/icons/Logo'

function PageHeader() {
  return (
    <View
      from={{ opacity: 0, translateY: -20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: 'spring' }}
      style={{ paddingLeft: 35, marginTop: 20 }}
    >
      <View
        style={{
          backgroundColor: '#3B76DE',
          height: 20,
          width: 120,
          position: 'absolute',
          bottom: 5,
          left: 20,
        }}
      />
      <Logo />
    </View>
  )
}
export default PageHeader
