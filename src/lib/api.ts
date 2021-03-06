import { LocationCoords, StationType, Status, User } from './types'
import { token } from '../../token'
import { getDistanceFromLatLng } from './helpers'
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
    .map((station: StationType, index: number) => {
      const stationStatus: Status = statusResult.data.stations[index]

      return {
        ...station,
        ...stationStatus,
        distance: getDistanceFromLatLng(
          station.lat,
          station.lon,
          location.latitude,
          location.longitude
        ),
      }
    })
    .sort((a: StationType, b: StationType) => a.distance > b.distance)

  const query = '*[_type == "user" && name == "Hannes"]'

  const sanityData = await client.fetch(query).then((user: User[]) => {
    state.userId = user[0]._id
    const userStations = user[0].stations
      .map((userStation) => {
        const matchedStation = parsedStations.find(
          (station: StationType) => station.station_id === userStation.id
        )
        return {
          ...userStation,
          ...matchedStation,
        } as StationType
      })
      .sort((a: StationType, b: StationType) =>
        a.distance > b.distance ? 1 : -1
      )

    const userJourneys = user[0].journeys?.map((userJourney) => {
      const fromStation = userJourney.fromClosest
        ? parsedStations[0]
        : parsedStations.find(
            (station: StationType) =>
              station.station_id === userJourney.fromStation
          )

      const toStation = parsedStations.find(
        (station: StationType) => station.station_id === userJourney.toStation
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

  return {
    userJourneys: sanityData.userJourneys,
    userStations: sanityData.userStations,
    stations: parsedStations,
    loaded: true,
  }
}

async function getStatus() {
  const data = await fetch(`${BASE_URL}/station_status.json`, {
    headers: headers,
  }).then((d) => d.json())

  return data
}

export async function addStation(station: StationType) {
  const newStation = {
    name: station.name,
    id: station.station_id,
  }

  await client
    .patch(state.userId)
    .setIfMissing({ stations: [] })
    .insert('before', 'stations[-1]', [{ _key: Math.random(), ...newStation }])
    .commit()

  await getStations(state.location)
}

export async function addJourney(
  fromStation: string,
  toStation: string,
  name: string
) {
  const sanityJourney = {
    fromStation: fromStation,
    toStation: toStation,
    name: name,
  }

  await client
    .patch(state.userId)
    .setIfMissing({ journeys: [] })
    .insert('before', 'journeys[-1]', [
      { _key: `${Math.random()}`, ...sanityJourney },
    ])
    .commit()

  await getStations(state.location)
}

export async function deleteStation(stationId: string) {
  const stationsToRemove = [`stations[id=="${stationId}"]`]

  await client.patch(state.userId).unset(stationsToRemove).commit()
  await getStations(state.location)
}

export async function deleteJourney(key: string) {
  const journeyToRemove = [`journeys[_key=="${key}"]`]

  await client.patch(state.userId).unset(journeyToRemove).commit()
  await getStations(state.location)
}
