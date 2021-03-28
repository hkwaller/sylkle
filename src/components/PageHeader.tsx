import React from 'react'
import { View } from 'moti'
import { fancyColors } from 'src/lib/constants'
import { AppHeader } from './styled'

type Props = {
  title: string
  color?: string
}

function PageHeader({ title, color }: Props) {
  return (
    <View
      from={{ opacity: 0, translateY: -20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: 'spring' }}
      style={{ paddingLeft: 20 }}
    >
      <View
        style={{
          backgroundColor: color || fancyColors.red,
          height: 20,
          width: 120,
          position: 'absolute',
          bottom: 0,
          left: 20,
        }}
      />
      <AppHeader>{title}</AppHeader>
    </View>
  )
}
export default PageHeader
