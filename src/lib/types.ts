export type Station = {
  station_id: string
  name: string
  address: string
  lat: number
  lon: number
  capacity: number
  distance: number
  color: string
  icon: string
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

export type UserData = {
  stations: Station[]
  journeys: UserJourney[]
}

export type UserJourney = {
  fromStation: Station
  toStation: Station
  color: string
  name: string
}

export type SanityStation = {
  name: string
  id: string
  color: string
}

export type SanityJourney = {
  fromStation: string
  toStation: string
}

export type User = {
  name: string
  stations: SanityStation[]
  journeys: SanityJourney[]
}
