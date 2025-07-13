import { collection, getDocs } from "firebase/firestore"
import { db } from "../firebase/index"
import { useEffect, useState } from "react"

const useCalendarTimeEntries = (currentDate) => {
  const [timeEntries, setTimeEntries] = useState([])

  useEffect(() => {
    const fetchTimeEntires = async () => {
      try {
        const timeEntriesCollection = await getDocs(collection(db, 'timeEntries'))
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
  }, [])
  return {
    timeEntries
  }
}

export default useCalendarTimeEntries