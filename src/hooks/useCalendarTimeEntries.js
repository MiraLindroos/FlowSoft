import { collection, getDocs, where, Timestamp, query, addDoc } from "firebase/firestore"
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

  const addTimeEntry = async (data) => {
    console.log(data)
    const docRef = await addDoc(collection(db, 'timeEntries'), {
      startTime: data.startTime,
      endTime: data.endTime,
      project: data.project,
      projectId: "testitestitesti",
      travels: data.travel,
      hourRate: data.hourRate,
      hours: 3,
      memo: data.memo,
      userId: "minä"
    })
    console.log(docRef.id)
  }

  return {
    timeEntries,
    addTimeEntry
  }
}

export default useCalendarTimeEntries