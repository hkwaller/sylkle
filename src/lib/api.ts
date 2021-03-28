import { LocationCoords, Station, Status, User, UserStation } from './types'
import { token } from '../../token'
import { getDistanceFromLatLng } from './helpers'
import { fancyColors, fancyColorsArray } from './constants'
import { state } from './state'
const sanityClient = require('@sanity/client')

const client = sanityClient({
  projectId: 'c339q3f3',
  dataset: 'production',
  token: token,
  useCdn: false,
  apiVersion: '1',
})

const headers = {
  'Client-Identifier': 'krawaller-sylkle',
}

const BASE_URL = 'https://gbfs.urbansharing.com/oslobysykkel.no'

export async function getStations(location: LocationCoords) {
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
    .sort((a: UserStation, b: UserStation) => a.distance > b.distance)

  const query = '*[_type == "user" && name == "Hannes"]'

  const sanityData = await client.fetch(query).then((user: User[]) => {
    state.userId = user[0]._id
    const userStations = user[0].stations
      .map((userStation) => {
        const matchedStation = parsedStations.find(
          (station: UserStation) => station.station_id === userStation.id
        )
        return {
          ...userStation,
          ...matchedStation,
        } as UserStation
      })
      .sort((a: UserStation, b: UserStation) =>
        a.distance > b.distance ? 1 : -1
      )

    const userJourneys = user[0].journeys?.map((userJourney) => {
      const fromStation = parsedStations.find(
        (station: UserStation) => station.station_id === userJourney.fromStation
      )

      const toStation = parsedStations.find(
        (station: UserStation) => station.station_id === userJourney.toStation
      )

      return {
        ...userJourney!,
        fromStation: fromStation!,
        toStation: toStation!,
      }
    })

    return {
      userStations,
      userJourneys,
    }
  })
  state.loaded = true
  state.stations = parsedStations
  state.userJourneys = sanityData.userJourneys || []
  state.userStations = sanityData.userStations || []
}

async function getStatus() {
  const data = await fetch(`${BASE_URL}/station_status.json`, {
    headers: headers,
  }).then((d) => d.json())

  return data
}

export async function addStation(station: Station) {
  const newStation = {
    name: station.name,
    id: station.station_id,
    color: Object.keys(fancyColors).map((k) => k)[
      Math.floor(Math.random(fancyColorsArray.length) * 10)
    ],
  }

  await client
    .patch(state.userId)
    .setIfMissing({ stations: [] })
    .insert('before', 'stations[-1]', [{ _key: Math.random(), ...newStation }])
    .commit()

  await getStations(state.location)
}

export async function addJourney(fromStation: string, toStation: string) {
  const sanityJourney = {
    fromStation: fromStation,
    toStation: toStation,
    color: Object.keys(fancyColors).map((k) => k)[
      Math.floor(Math.random(fancyColorsArray.length) * 10)
    ],
    name: 'Hej',
  }

  await client
    .patch(state.userId)
    .setIfMissing({ journeys: [] })
    .insert('before', 'journeys[-1]', [
      { _key: Math.random(), ...sanityJourney },
    ])
    .commit()

  await getStations(state.location)
}

export async function deleteStation(index: number) {
  const stationsToRemove = [`stations[${index}]`]

  await client.patch(state.userId).unset(stationsToRemove).commit()
  await getStations(state.location)
}
