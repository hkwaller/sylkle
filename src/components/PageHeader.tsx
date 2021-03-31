import React from 'react'
import { View } from 'moti'
import { fancyColors } from 'src/lib/constants'
import { AppHeader } from './styled'
import Logo from 'src/icons/Logo'

type Props = {
  title?: string
}

function PageHeader({ title }: Props) {
  return (
    <View
      from={{ opacity: 0, translateY: -20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: 'spring' }}
      style={{ paddingLeft: title ? 20 : 35, marginTop: 20 }}
    >
      <View
        style={{
          backgroundColor: fancyColors.blue,
          height: 20,
          width: 120,
          position: 'absolute',
          bottom: 0,
          left: 20,
        }}
      />
      {title ? <AppHeader>{title}</AppHeader> : <Logo />}
    </View>
  )
}
export default PageHeader
