import { db } from "../firebase"
import { collection, query, where, Timestamp, onSnapshot } from "firebase/firestore"
import { useEffect, useState } from "react"
import { useAtomValue } from "jotai"
import { currentUserAtom } from "../jotai/atoms"
import { getISOWeek } from 'date-fns'

const Statistics = () => {
  const currentUser = useAtomValue(currentUserAtom)
  const [hours, setHours] = useState([])

  const currentDate = new Date()
  const currentMonth = currentDate.getMonth()
  const currentYear = currentDate.getFullYear()
  // Converting current date to timestamps
  const startOfTheMonth = Timestamp.fromDate(new Date(currentYear, currentMonth, 1))
  const endOfTheMonth = Timestamp.fromDate(new Date(currentYear, currentMonth + 1, 0))

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
          where  ('startTime', '<=', endOfTheMonth)
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
  
  // Convert hour string e.g. "3.30" to 3.5
  const parseHours = (hoursString) => {
    const [hours, minutes] = hoursString.split('.').map(Number)
    return hours + minutes / 60
  }

  // Empty object to contain weekly hours
  const weeklyTotals = {}

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

  // Convert weeklytotals to an array with objects for showing data correctly in HoursThisMonth component
  const weekHours = Object.entries(weeklyTotals).map(([week, tunnit]) => ({
    week: `viikko ${week}`,
    tunnit: tunnit.toFixed(2) // Round up to two decimals
  }))

  console.log(weekHours)


  return {
    weekHours
  }
}

export default Statistics