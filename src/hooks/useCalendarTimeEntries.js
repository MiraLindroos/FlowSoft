import { collection, getDocs, where, Timestamp, query, addDoc } from "firebase/firestore"
import { db } from "../firebase/index"
import { useEffect, useState } from "react"

const useCalendarTimeEntries = (currentMonth, currentYear, currentUser) => {
  const [timeEntries, setTimeEntries] = useState([])

  useEffect(() => {
    // Fetching time entries from firestore
    const fetchTimeEntries = async () => {
      try {
        // Converting dates to timestamps
        const startOfTheMonth = Timestamp.fromDate(new Date(currentYear, currentMonth, 1))
        const endOfTheMonth = Timestamp.fromDate(new Date(currentYear, currentMonth + 1, 0))
        // Fetch all entries that are in the current month
        const q = query(
          collection(db, 'timeEntries'),
          where('userId', '==', currentUser),
          where('startTime', '>=', startOfTheMonth),
          where('startTime', '<=', endOfTheMonth)
        )

        const timeEntriesCollection = await getDocs(q)
        const timeEntriesArray = []
        // Go through each document and push its data to the timeEntriesArray
        timeEntriesCollection.forEach((doc) => {
          // doc.data() returs the document data as an object
          timeEntriesArray.push({id: doc.id, ...doc.data()})
        })
        // Update the state with the fetched time entries
        setTimeEntries(timeEntriesArray)
      } catch (e) {
        console.error(e)
      }
    }
    fetchTimeEntries()
  }, [currentMonth, currentYear])

  // Add new document to firestore collection 'timeEntries' with following data
  const addTimeEntry = async (data) => {
    await addDoc(collection(db, 'timeEntries'), {
      startTime: data.startTime,
      endTime: data.endTime,
      project: data.project,
      projectId: "testitestitesti",
      travels: data.travel,
      hourRate: data.hourRate,
      hours: data.hours,
      memo: data.memo,
      userId: currentUser
    })
  }

  return {
    timeEntries,
    addTimeEntry
  }
}

export default useCalendarTimeEntries