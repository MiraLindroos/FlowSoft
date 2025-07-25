import { db } from "../firebase"
import { collection, query, where, Timestamp, onSnapshot } from "firebase/firestore"
import { useEffect, useState } from "react"
import { useAtomValue } from "jotai"
import { currentUserAtom } from "../jotai/atoms"

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

  const data = [
    {
      name: 'Vko 1',
      dateRange: '1.–7.6.',
      tunnit: 25,
    },
    {
      name: 'Vko 2',
      dateRange: '8.–14.6.',
      tunnit: 35,
    },
    {
      name: 'Vko 3',
      dateRange: '15.–21.6.',
      tunnit: 31,
    },
    {
      name: 'Vko 4',
      dateRange: '22.–28.6.',
      tunnit: 30,
    },
    {
      name: 'Vko 5',
      dateRange: '29.–30.6.',
      tunnit: 9,
    },
  ]


  return {
    data
  }
}

export default Statistics