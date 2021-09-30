import React from 'react'
import * as SecureStore from 'expo-secure-store'
import GymIcon from 'src/icons/GymIcon'
import HouseIcon from 'src/icons/HouseIcon'
import WorkIcon from 'src/icons/WorkIcon'
import { JourneyType, Location, LocationCoords, StationType } from './types'

export function getDistanceFromLatLng(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
) {
  const r = 6371
  lat1 = deg2rad(lat1)
  lat2 = deg2rad(lat2)
  const lat_dif = lat2 - lat1
  const lng_dif = deg2rad(lng2 - lng1)
  const a =
    square(Math.sin(lat_dif / 2)) +
    Math.cos(lat1) * Math.cos(lat2) * square(Math.sin(lng_dif / 2))
  const d = 2 * r * Math.asin(Math.sqrt(a))

  return Math.floor(d * 1000)
}

function deg2rad(deg: number) {
  return deg * (Math.PI / 180)
}

function square(x: number) {
  return Math.pow(x, 2)
}

export function iconMapper(name: string): React.VFC<{ color?: string }> {
  switch (name) {
    case 'home':
      return HouseIcon
    case 'gym':
      return GymIcon
    case 'work':
      return WorkIcon
    default:
      return HouseIcon
  }
}

export function getNearestStations(
  station: StationType,
  stations: StationType[],
  type: 'from' | 'to',
  location?: LocationCoords
) {
  const sortedStations = stations
    .map((s: StationType) => {
      return {
        ...s,
        distance: getDistanceFromLatLng(
          s.lat,
          s.lon,
          location?.latitude || station.lat,
          location?.longitude || station.lon
        ),
      }
    })
    .sort((a: StationType, b: StationType) =>
      a.distance > b.distance ? 1 : -1
    )
    .filter(
      (s) =>
        s[type === 'from' ? 'num_bikes_available' : 'num_docks_available'] > 0
    )
    .slice(0, 10)

  return sortedStations
}

export async function save(key: string, value: string) {
  await SecureStore.setItemAsync(key, value)
}

export async function getValueFor(key: string) {
  let result = await SecureStore.getItemAsync(key)
  if (result) {
    console.log("🔐 Here's your value 🔐 \n" + result)
    return result
  } else {
    console.log('No values stored under that key.')
    return undefined
  }
}
