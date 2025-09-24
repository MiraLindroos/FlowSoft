import { db } from "../firebase"
import { collection, query, where, Timestamp, onSnapshot } from "firebase/firestore"
import { useEffect, useState } from "react"
import { useAtomValue } from "jotai"
import { currentUserAtom } from "../jotai/atoms"
import { getISOWeek } from 'date-fns'

const useStatistics = () => {
  const currentUser = useAtomValue(currentUserAtom)
  const [hours, setHours] = useState([])
  const [travels, setTravels] = useState([])

  const currentDate = new Date()
  const currentMonth = currentDate.getMonth()
  const currentYear = currentDate.getFullYear()
  // Converting current date to timestamps
  const startOfTheMonth = Timestamp.fromDate(new Date(currentYear, currentMonth, 1))
  const endOfTheMonth = new Date(currentYear, currentMonth + 1, 0)
  // Set endOfTheMonth hours to be 23:59 instead of 00:00
  endOfTheMonth.setHours(23, 59, 59, 999)
  const endOfTheMonthTs = Timestamp.fromDate(endOfTheMonth)

  // Hours listener
  useEffect(() => {
    // Initialize an empty unsubscribe function to be safely called later
    // This prevents "unsubscribe is not a function" errors if for some reason onSnapshot fails or doesn't run
    let unsubscribe = () => {}

    const fetchHours =  () => {
      try {
        // Fetch all entries from current user that are in the current month
        const q = query(
          collection(db, 'timeEntries'),
          where('userId', '==', currentUser),
          where('startTime', '>=', startOfTheMonth),
          where  ('startTime', '<=', endOfTheMonthTs)
        )
        // Start listening to real-time updates from Firestore
        unsubscribe = onSnapshot(q, (querySnapshot) => {
          const hoursArray = []
          // Go through each document and push its data to the hoursArray
          querySnapshot.forEach((doc) => {
            hoursArray.push({...doc.data()})
          })

          const mappedHours = hoursArray.map((h) => ({hours: h.hours, date: h.startTime}))

          setHours(mappedHours)
        })
      } catch (e) {
        console.error(e)
      }
    }
    fetchHours()
    // Cleanup function runs when the component is unmounted or when a depency changes
    return () => {
      // Stop listening to real-time Firestore updates to prevent memory leaks and duplicate listeners
      unsubscribe()
    }
  }, [])

  // Travels listener
  useEffect(() => {
    // Initialize an empty unsubscribe function to be safely called later
    // This prevents "unsubscribe is not a function" errors if for some reason onSnapshot fails or doesn't run
    let unsubscribe = () => {}

    const fetchTravels = () => {
      try {
        // Fetch all travels from current user that are in the current month
        const q = query(
          collection(db, 'travels'),
          where('userId', '==', currentUser),
          where('date', '>=', startOfTheMonth),
          where('date', '<=', endOfTheMonthTs)
        )
        // Start listening to real-time updates from Firestore
        unsubscribe = onSnapshot(q, (querySnapshot) => {
          const travelsArray = []
          // Go through each document and push its data to the travelsArray
          querySnapshot.forEach((doc) => {
            travelsArray.push({...doc.data()})
          })
          // Map the data to be e.g. [{ km: '100', rate: ''}, { km: '150', rate: '0.6'}]
          const mappedTravels = travelsArray.map((travel) => ({ km: travel.kilometers, rate: travel.travelRate}))
          setTravels(mappedTravels)
        })
      } catch (e) {
        console.error(e)
      }
    }

    fetchTravels()
    // Cleanup function runs when the component is unmounted or when a depency changes
    return () => {
      // Stop listening to real-time Firestore updates to prevent memory leaks and duplicate listeners
      unsubscribe()
    }
  }, [])
  
  // Convert hour string e.g. "3.30" to 3.5
  const parseHours = (hoursString) => {
    const [hours, minutes] = hoursString.split('.').map(Number)
    return hours + minutes / 60
  }

  // Empty object to contain weekly hours
  const weeklyTotals = {}

  // Get the week numbers for the current month's first and last week
  const firstWeekOfMonth = getISOWeek(new Date(currentYear, currentMonth, 1))
  const lastWeekOfMonth = getISOWeek(new Date(currentYear, currentMonth + 1, 0))

  // Go through each hours entry
  hours.forEach((entry) => {
    const date = new Date(entry.date.seconds * 1000) // Convert Firestore timestamp to Date
    const week = getISOWeek(date) // Get ISO week number using date-fns library
    const parsedHours = parseHours(entry.hours) // Convert hours to decimal

    // If it's the first time this week appears, initialize it
    // so we can later add hours in there
    if (!weeklyTotals[week]) {
      weeklyTotals[week] = 0
    }

    // Add hours to this week's total 
    weeklyTotals[week] += parsedHours
  })
  // Empty array for week hours
  const weekHours = []

  // Go through all current month's weeks
  for (let i = firstWeekOfMonth; i <= lastWeekOfMonth; i++) {
    weekHours.push({
      week: `vk ${i}`,
      // If weeklyTotals[i] has a value, use it
      // Otherwise default to 0
      tunnit: (weeklyTotals[i] || 0).toFixed(2) // Round to two decimals
    })
  }

  // Sum the kilometers
  const totalKm = travels.map((travel) => Number(travel.km)).reduce((a, b) => a + b, 0)
  // Calculate km * travelRate and sum them together
  const totalEuro = travels.map(
    (travel) => Number(travel.km) * Number(travel.rate ? travel.rate : 0.5)
  ).reduce((a, b) => a + b, 0)
  // Array containing the data for the travel statistic card
  const monthTravels = [{
    km: totalKm,
    raha: totalEuro.toFixed(2),
    date: currentDate.toLocaleDateString('fi-Fi', {month: 'long'})
  }]

  return {
    weekHours,
    monthTravels
  }
}

export default useStatistics