import { Location, Station } from 'lib/types'
import { getDistanceFromLatLng } from './helpers'

const headers = {
  'Client-Identifier': 'krawaller-sylkle',
}

const BASE_URL = 'https://gbfs.urbansharing.com/oslobysykkel.no'

export async function getStations(location: Location) {
  const result = await fetch(`${BASE_URL}/station_information.json`, {
    headers: headers,
  }).then((d) => d.json())

  const statusResult = await getStatus()

  const parsedStations = await result.data.stations
    .map((station: Station, index: number) => {
      const stationStatus = statusResult.data.stations[index]

      return {
        ...station,
        num_bikes_available: stationStatus.num_bikes_available,
        num_docks_available: stationStatus.num_docks_available,
        distance: getDistanceFromLatLng(
          station.lat,
          station.lon,
          __DEV__ ? 59.9041673 : location.coords.latitude,
          __DEV__ ? 10.7865407 : location.coords.longitude
        ),
      }
    })
    .sort((a: Station, b: Station) => a.distance > b.distance)
    .slice(0, 3)

  return parsedStations
}

async function getStatus() {
  const data = await fetch(`${BASE_URL}/station_status.json`, {
    headers: headers,
  }).then((d) => d.json())

  return data
}
