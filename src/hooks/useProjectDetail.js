import { doc, onSnapshot } from "firebase/firestore"
import { db } from "../firebase/index"
import { useEffect, useState } from "react"

const useProjectDetail = (id) => {
  const [project, setProject] = useState()
  useEffect(() => {
    // Initialize an empty unsubscribe function to be safely called later
    // This prevents "unsubscribe is not a function" errors if for some reason onSnapshot fails or doesn't run
    let unsubscribe = () => {}
    // Async function to fetch the project from Firestore and listen for real-time updates
    const fetchProject = async () => {
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
    }
    fetchProject()
    // Cleanup function runs when the component is unmounted or when id changes
    return () => {
    // Stop listening to real-time Firestore updates to prevent memory leaks and duplicate listeners
      unsubscribe()
    }
  }, [id])

  return {
    project
  }
}

export default useProjectDetail