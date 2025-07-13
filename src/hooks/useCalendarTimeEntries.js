import { collection, getDocs, where, Timestamp, query } from "firebase/firestore"
import { db } from "../firebase/index"
import { useEffect, useState } from "react"

const useCalendarTimeEntries = (currentMonth, currentYear) => {
  const [timeEntries, setTimeEntries] = useState([])

  useEffect(() => {
    const fetchTimeEntires = async () => {
      try {
        const startOfTheMonth = Timestamp.fromDate(new Date(currentYear, currentMonth, 1))
        const endOfTheMonth = Timestamp.fromDate(new Date(currentYear, currentMonth + 1, 0))

        const q = query(
          collection(db, 'timeEntries'),
          where('startTime', '>=', startOfTheMonth),
          where('startTime', '<=', endOfTheMonth)
        )

        const timeEntriesCollection = await getDocs(q)
        const timeEntriesArray = []
        timeEntriesCollection.forEach((doc) => {
          timeEntriesArray.push({id: doc.id, ...doc.data()})
        })
        setTimeEntries(timeEntriesArray)
      } catch (e) {
        console.error(e)
      }
    }
    fetchTimeEntires()
  }, [currentMonth, currentYear])

  console.log(timeEntries)
  return {
    timeEntries
  }
}

export default useCalendarTimeEntries