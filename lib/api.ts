import { Location, Station, User } from './types'
import { token } from '../token'
import { getDistanceFromLatLng } from './helpers'
const sanityClient = require('@sanity/client')

const client = sanityClient({
  projectId: 'am0de4ur',
  dataset: 'production',
  token: token,
  useCdn: true,
})

const headers = {
  'Client-Identifier': 'krawaller-sylkle',
}

const BASE_URL = 'https://gbfs.urbansharing.com/oslobysykkel.no'

export async function getUser(stations: Station[]) {
  const query = '*[_type == "user" && name == "Hannes"]'

  return await client.fetch(query).then((user: User[]) => {
    const userStations = user[0].stations.map((userStation) => {
      const matchedStation = stations.find(
        (station) => station.station_id === userStation.id
      )
      return {
        ...userStation,
        ...matchedStation,
      }
    })

    const userJourneys = user[0].journeys.map((userJourney) => {
      const fromStation = stations.find(
        (station) => station.station_id === userJourney.fromStation
      )

      const toStation = stations.find(
        (station) => station.station_id === userJourney.toStation
      )

      return {
        fromStation,
        toStation,
      }
    })

    return {
      stations: userStations,
      journeys: userJourneys,
    }
  })
}

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

  return parsedStations
}

async function getStatus() {
  const data = await fetch(`${BASE_URL}/station_status.json`, {
    headers: headers,
  }).then((d) => d.json())

  return data
}
