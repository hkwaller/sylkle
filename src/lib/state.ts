import { store } from '@risingstack/react-easy-state'
import { Station, UserJourney, UserStation } from './types'
import * as Location from 'expo-location'

export type State = {
  stations: Station[]
  userStations: UserStation[]
  userJourneys: UserJourney[]
  location: any
  loaded: boolean
  storedStations: any[]
  storedJourneys: any[]
  hasPurchased: boolean
}

export const state = store<State>({
  loaded: false,
  stations: [],
  userStations: [],
  userJourneys: [],
  storedStations: [],
  storedJourneys: [],
  hasPurchased: false,
  location: {
    coords: {
      latitude: 60.0,
      longitude: 10.0,
    },
  },
})
