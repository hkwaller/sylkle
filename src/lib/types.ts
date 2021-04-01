export type StationType = {
  id: string
  station_id: string
  name: string
  address: string
  lat: number
  lon: number
  capacity: number
  distance: number
} & Status

export type Status = {
  station_id: number
  is_installed: number
  is_renting: number
  is_returning: number
  last_reported: number
  num_bikes_available: number
  num_docks_available: number
}

export type Location = {
  coords: {
    latitude: number
    longitude: number
  }
}

export type SanityJourney = {
  _key: string
  fromStation: string
  toStation: string
  name: string
  icon: string
  fromClosest: boolean
}

export type JourneyType = {
  _key: string
  fromStation: StationType
  toStation: StationType
} & Omit<SanityJourney, 'fromStation' | 'toStation'>

export type User = {
  _id: string
  name: string
  stations: StationType[]
  journeys: JourneyType[]
}

export type LocationCoords = {
  latitude: number
  longitude: number
}
