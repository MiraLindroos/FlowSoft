import { useEffect, useState } from "react"
import { db } from "../firebase/index"
import { setDoc, onSnapshot, query, collection, where } from "firebase/firestore"
import { currentUserAtom } from "../jotai/atoms"
import { useAtomValue } from "jotai"

const useTravels = () => {
  const userId = useAtomValue(currentUserAtom)
  const [travels, setTravels] = useState()

  useEffect(() => {
    // Initialize an empty unsubscribe function to be safely called later
    // This prevents "unsubscribe is not a function" errors if for some reason onSnapshot fails or doesn't run
    let unsubscribe = () => {}
    try {
      const q = query(
        collection(db, 'travels'),
        where('userId', '==', userId)
      )

      unsubscribe = onSnapshot(q, (querySnapshot) => {
        const travelsArray = []

        querySnapshot.forEach((doc) => {
          travelsArray.push({id: doc.id, ...doc.data()})
        })
        setTravels(travelsArray)
      })
    } catch (e) {
      console.error(e)
    }
    // Cleanup function runs when the component is unmounted
    return () => {
    // Stop listening to real-time Firestore updates to prevent memory leaks and duplicate listeners
      unsubscribe()
    }
  }, [])

  return {
    travels,
  }
}

export default useTravels