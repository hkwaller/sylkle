import { SanityJourney, StationType, Status } from './types'
import { getDistanceFromLatLng, getValueFor, save } from './helpers'
import { state } from './state'
import * as Location from 'expo-location'
import { autoEffect } from '@risingstack/react-easy-state'

const headers = {
  'Client-Identifier': 'krawaller-sylkle',
}

const BASE_URL = 'https://gbfs.urbansharing.com/oslobysykkel.no'

export async function getStations() {
  const result = await fetch(`${BASE_URL}/station_information.json`, {
    headers: headers,
  }).then((d) => d.json())

  const userJourneyData = await getValueFor('storedUserJourneys')
  const storedUserJourneys = JSON.parse(userJourneyData || '[]')

  const userStationData = await getValueFor('storedUserStations')
  const storedUserStations = JSON.parse(userStationData || '[]')

  const statusResult = await getStatus()
  const location = await Location.getCurrentPositionAsync({
    accuracy: Location.Accuracy.Balanced,
  })

  const parsedStations = result.data.stations
    .map((station: StationType) => {
      const stationStatus: Status = statusResult.data.stations.find(
        (s: any) => s.station_id === station.station_id
      )

      return {
        ...station,
        ...stationStatus,
        distance: getDistanceFromLatLng(
          station.lat,
          station.lon,
          location.coords.latitude,
          location.coords.longitude
        ),
      }
    })
    .sort((a: StationType, b: StationType) => a.distance > b.distance)

  const userStations = storedUserStations
    .map((userStation: any) => {
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

  const userJourneys = storedUserJourneys.map((userJourney: any) => {
    const fromStation = parsedStations.filter(
      (station: StationType) => station.num_bikes_available > 0
    )[0]

    const toStation: StationType = parsedStations.find(
      (station: StationType) => station.station_id === userJourney.toStation
    )

    let newDestination
    if ((toStation.num_docks_available || 0) === 0) {
      newDestination = parsedStations
        .map((station: StationType) => {
          return {
            ...station,
            distance: getDistanceFromLatLng(
              station.lat,
              station.lon,
              toStation.lat,
              toStation.lon
            ),
          }
        })
        .sort((a: StationType, b: StationType) =>
          a.distance > b.distance ? 1 : -1
        )
        .filter(
          (station: StationType) => (station.num_docks_available || 0) > 0
        )[0]
    }

    return {
      ...userJourney!,
      fromStation: fromStation!,
      toStation: toStation!,
      updatedToStation: newDestination,
    }
  })

  state.stations = parsedStations
  state.userJourneys = userJourneys
  state.userStations = userStations
  state.loaded = true
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

  const storedStations = await getValueFor('storedUserStations')
  const parsedStoredStations = storedStations ? JSON.parse(storedStations!) : []

  const newStationList = [...parsedStoredStations, newStation]
  save('storedUserStations', JSON.stringify(newStationList))

  await getStations()
}

export async function addJourney(toStation: string, name: string) {
  const newJourney = {
    toStation: toStation,
    name: name,
  }

  const storedJourneys = await getValueFor('storedUserJourneys')
  const parsedStoredJourneys = storedJourneys ? JSON.parse(storedJourneys!) : []

  const newJourneyList = [...parsedStoredJourneys, newJourney]
  save('storedUserJourneys', JSON.stringify(newJourneyList))

  await getStations()
}

export async function deleteStation(stationId: string) {
  const newStationList = state.storedStations.filter(
    (s: StationType) => s.id !== stationId
  )

  save('storedUserStations', JSON.stringify(newStationList))
  await getStations()
}

export async function deleteJourney(stationId: string) {
  const filteredJourneys = state.storedJourneys.filter(
    (s: SanityJourney) => s.toStation !== stationId
  )

  save('storedUserJourneys', JSON.stringify(filteredJourneys))

  await getStations()
}

autoEffect(async () => {
  console.log(state.location)
  await getStations()
})
