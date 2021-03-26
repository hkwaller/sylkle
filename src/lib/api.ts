import {
  Location,
  LocationCoords,
  SanityStation,
  Station,
  Status,
  User,
} from './types'
import { token } from '../../token'
import { getDistanceFromLatLng } from './helpers'
import { fancyColors, fancyColorsArray } from './constants'
const sanityClient = require('@sanity/client')

const client = sanityClient({
  projectId: 'am0de4ur',
  dataset: 'production',
  token: token,
  useCdn: false,
  apiVersion: '1',
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
        ...userJourney,
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

export async function getStations(location?: LocationCoords) {
  if (!location) return []

  const result = await fetch(`${BASE_URL}/station_information.json`, {
    headers: headers,
  }).then((d) => d.json())

  const statusResult = await getStatus()

  const parsedStations = await result.data.stations
    .map((station: Station, index: number) => {
      const stationStatus: Status = statusResult.data.stations[index]

      return {
        ...station,
        ...stationStatus,
        distance: getDistanceFromLatLng(
          station.lat,
          station.lon,
          __DEV__ ? 59.9041673 : location.latitude,
          __DEV__ ? 10.7865407 : location.longitude
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

export async function addStation(station: Station) {
  const newStation = {
    _type: 'station',
    name: station.name,
    id: station.station_id,
    color:
      fancyColorsArray[Math.floor(Math.random(fancyColorsArray.length) * 10)],
  }

  await client.create(newStation).then(async (res: SanityStation) => {
    console.log(`Station was created, document ID is ${res.name}`)
    await getStations()
  })
}
