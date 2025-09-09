import { useEffect, useState } from "react"
import { db } from "../firebase/index"
import { setDoc, onSnapshot, query, collection, where, doc, deleteDoc, orderBy, getDocs, updateDoc, increment } from "firebase/firestore"
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
        where('userId', '==', userId),
        orderBy('date', 'desc')
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
    try {
      const docRef = data.id ? doc(db, 'travels', data.id) // If id, edit existing doc
      : doc(collection(db, 'travels')) // Create new doc if no id
      
      const travelData = {
        kilometers: data.kilometers,
        userId: userId,
        from: data.from ? data.from : "",
        destination: data.to ? data.to : "",
        projectId: data.projectId,
        project: data.project,
        travelRate: data.travelRate,
        memo: data.memo,
        entryId: data.entryId ? data.entryId : ""
      }

      if (data.id) {
        travelData.name = `${data.project} : ${new Date(data.date).toLocaleDateString()} - ${data.kilometers}km`
        travelData.date = new Date(data.date)
      } else {
        travelData.name = `${data.project} : ${data.date.toLocaleDateString()} - ${data.kilometers}km`
        travelData.date = data.date
        incremetProjectKm(data.projectId, data.kilometers)
      }

      await toast.promise(
        setDoc(docRef, travelData),
        {
          loading: "Matkaa tallennetaan...",
          success: "Matka tallennettu",
          error: "Matkan tallentaminen epäonnistui"
        }
      )
    } catch (e) {
      console.error(e)
    }
  }

  // Increment the selected project's kilometers when a travel is added
  const incremetProjectKm = async (id, km) => {
    try {
      const projectRef = doc(db, 'projects', id)
      await updateDoc(projectRef, {
        kilometers: increment(Number(km) || 0)
      })
    } catch (e) {
      console.error(e)
    }
  }

  const onEntryEditTravel = async (data) => {
    try {
      const q = query(
        collection(db, 'travels'),
        where("entryId", "==", data.entryId)
      )
      const querySnapshot = await getDocs(q)
      if (querySnapshot.empty) {
        addTravel({...data, id: null})
        return
      }
      const docSnap = querySnapshot.docs[0]
      const docRef = doc(db, 'travels', docSnap.id)

      await toast.promise (
        updateDoc(docRef,
          {
            kilometers: data.kilometers,
            projectId: data.projectId,
            project: data.project,
            travelRate: data.travelRate,
            memo: data.memo,
            name: `${data.project} : ${data.date.toLocaleDateString()} - ${data.kilometers}km`,
            date: new Date(data.date),
          }
        ),
        {
          loading: "Matkaa tallennetaan...",
          success: "Matkan muokkaus onnistui",
          error: "Matkan muokkaus epäonnistui"
        }
      )
    } catch (e) {
      console.error(e)
    }
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
    incremetProjectKm,
    onEntryEditTravel,
    deleteTravel
  }
}

export default useTravels