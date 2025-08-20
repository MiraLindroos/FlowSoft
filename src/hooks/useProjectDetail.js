import { collection, doc, onSnapshot, query, where, getDocs } from "firebase/firestore"
import { db } from "../firebase/index"
import { useEffect, useState } from "react"

const useProjectDetail = (id) => {
  const [project, setProject] = useState()
  const [totalHours, setTotalHours] = useState()
  const [totalKilometers, setTotalKilometers] = useState()

  useEffect(() => {
    // Initialize an empty unsubscribe function to be safely called later
    // This prevents "unsubscribe is not a function" errors if for some reason onSnapshot fails or doesn't run
    let unsubscribe = () => {}
    // Fetch the project from Firestore and listen for real-time updates
    try {
      // Start listening to real-time updates from Firestore
      // Find project document with given id
      unsubscribe = onSnapshot(
        doc(db, 'projects', id),
        (documentSnapshot) => {
          if (documentSnapshot.exists()) {
            // Update state with the data from Firestore
            setProject({ id: documentSnapshot.id, ...documentSnapshot.data()})
          } else {
            console.log('cant find document')
          }
        }
      )
    } catch (e) {
      console.error(e)
    }
    // Cleanup function runs when the component is unmounted or when id changes
    return () => {
    // Stop listening to real-time Firestore updates to prevent memory leaks and duplicate listeners
      unsubscribe()
    }
  }, [id])

  // Fetch the project's timeEntries between the given date range
  const fetchProjectHours = async (start, end) => {
    try {
      const q = query(
        collection(db, 'timeEntries'),
        where('projectId', '==', id),
        where('startTime', '>=', start),
        where('startTime', '<=', end)
      )
      const querySnapshot = await getDocs(q)
      // Add only hours to hoursArray and convert the hours into numbers
      const hoursArray = querySnapshot.docs.map(doc => Number(doc.data().hours || 0))
      // Calculate the sum of the hours
      const summedHours = hoursArray.reduce((accumulator, hour) => accumulator + hour, 0)
      setTotalHours(summedHours)

      // Add only kilometers to travelsArray and convert the kilometers into numbers
      const travelsArray = querySnapshot.docs.map(doc => Number(doc.data().kilometers || 0))
      // Calculate the sum of the kilometers
      const summedTravels = travelsArray.reduce((accumulator, travel) => accumulator + travel, 0)
      setTotalKilometers(summedTravels)
    } catch (e) {
      console.error(e)
    }
  }

  return {
    project,
    fetchProjectHours,
    totalHours,
    totalKilometers
  }
}

export default useProjectDetail