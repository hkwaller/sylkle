import { store } from '@risingstack/react-easy-state'
import { LocationCoords, Station, UserJourney, UserStation } from './types'

export type State = {
  userId: string
  stations: Station[]
  userStations: UserStation[]
  userJourneys: UserJourney[]
  location: LocationCoords
}

export const state = store<State>({
  userId: '',
  stations: [],
  userStations: [],
  userJourneys: [],
  location: {
    latitude: 60.0,
    longitude: 10.0,
  },
})
