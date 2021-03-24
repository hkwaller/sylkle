export type Station = {
  station_id: string
  name: string
  address: string
  lat: number
  lon: number
  capacity: number
  distance: number
  num_bikes_available: number
  num_docks_available: number
}

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
