import { useState, useEffect } from "react"
import { db } from "../firebase/index"
import { doc, onSnapshot } from "firebase/firestore"

const useTravelDetail = (id) => {
  const [travel, setTravel] = useState()

  useEffect(() => {
    // Initialize an empty unsubscribe function to be safely called later
    // This prevents "unsubscribe is not a function" errors if for some reason onSnapshot fails or doesn't run
    let unsubscribe = () => {}
    // Fetch the travel from Firestore and listen for real-time updates
    try {
      // Start listening to real-time updates from Firestore
      // Find travel document with given id
      unsubscribe = onSnapshot(
        doc(db, 'travels', id),
        (documentSnapshot) => {
          if (documentSnapshot.exists()) {
            // Update state with the data from Firestore
            setTravel({id: documentSnapshot.id, ...documentSnapshot.data()})
          } else {
            console.log("Can't find travel")
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

  return {
    travel
  }
}

export default useTravelDetail