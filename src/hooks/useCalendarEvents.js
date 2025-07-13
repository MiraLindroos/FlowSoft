import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/index"
import { useEffect, useState } from "react";

const useCalendarEvents = () => {
  const [events, setEvents] = useState([])

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsCollection = await getDocs(collection(db, 'timeEntries'))
        const eventsArray = []
        eventsCollection.forEach((doc) => {
          eventsArray.push({id: doc.id, ...doc.data()})
        })
        setEvents(eventsArray)
      } catch (e) {
        console.error(e)
      }
    }
    fetchEvents()
  }, [])
  console.log(events)

  return {
    events
  }
}

export default useCalendarEvents