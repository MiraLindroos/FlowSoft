import { useEffect, useState } from "react"
import { db } from "../firebase/index"
import { setDoc, onSnapshot, query, collection, where, doc, deleteDoc } from "firebase/firestore"
import { currentUserAtom } from "../jotai/atoms"
import { useAtomValue } from "jotai"
import toast from "react-hot-toast"

const useTravels = () => {
  const userId = useAtomValue(currentUserAtom)
  const [travels, setTravels] = useState()

  useEffect(() => {
    // Initialize an empty unsubscribe function to be safely called later
    // This prevents "unsubscribe is not a function" errors if for some reason onSnapshot fails or doesn't run
    let unsubscribe = () => {}
    // Fetch travels from Firestore and listen for real-time updates
    try {
      // Get all documents for the current user from the travels collection
      const q = query(
        collection(db, 'travels'),
        where('userId', '==', userId)
      )
      // Start listening to real-time updates from Firestore
      unsubscribe = onSnapshot(q, (querySnapshot) => {
        const travelsArray = []
        // Go through each document and push its data to the travelsArray
        querySnapshot.forEach((doc) => {
          // doc.data() returs the document data as an object
          travelsArray.push({id: doc.id, ...doc.data()})
        })
        // Update the state with the fetched travels
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

  const addTravel = async (data) => {
    const docRef = doc(collection(db, 'travels'))
    await toast.promise(
      setDoc(docRef, {
        date: new Date(data.date),
        kilometers: data.km,
        userId: userId,
        from: data.from,
        destination: data.to,
        project: 'testi',
        name: `${data.date} - ${data.km}km`
      }),
      {
        loading: "Matkaa lisätään...",
        success: "Matka lisätty",
        error: "Matkan lisääminen epäonnistui"
      }
    )
  }

  const deleteTravel = async (id) => {
    await toast.promise(
      deleteDoc(doc(db, 'travels', id)),
      {
        loading: 'Poistetaan...',
        success: 'Poisto onnistui!',
        error: 'Posto epäonnistui'
      }
    )
  }

  return {
    travels,
    addTravel,
    deleteTravel
  }
}

export default useTravels