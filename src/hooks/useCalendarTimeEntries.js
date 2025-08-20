import { collection, where, Timestamp, query, setDoc, doc, deleteDoc, onSnapshot, updateDoc, increment} from "firebase/firestore"
import { db } from "../firebase/index"
import { useEffect } from "react"
import toast from "react-hot-toast"
import { useAtomValue, useSetAtom } from 'jotai'
import { currentUserAtom, timeEntriesAtom } from '../jotai/atoms'

const useCalendarTimeEntries = (currentMonth, currentYear) => {
  const currentUser = useAtomValue(currentUserAtom)
  const setTimeEntries = useSetAtom(timeEntriesAtom)

  useEffect(() => {
    // Initialize an empty unsubscribe function to be safely called later
    // This prevents "unsubscribe is not a function" errors if for some reason onSnapshot fails or doesn't run
    let unsubscribe = () => {}
    // Fetching time entries from firestore and listen for real-time updates
    const fetchTimeEntries = () => {
      try {
        // Converting dates to timestamps
        const startOfTheMonth = Timestamp.fromDate(new Date(currentYear, currentMonth, 1))
        const endOfTheMonth = Timestamp.fromDate(new Date(currentYear, currentMonth + 1, 0))

        // Fetch all entries from current user that are in the current month
        const q = query(
          collection(db, 'timeEntries'),
          where('userId', '==', currentUser),
          where('startTime', '>=', startOfTheMonth),
          where('startTime', '<=', endOfTheMonth)
        )
        // Start listening to real-time updates from Firestore
        unsubscribe = onSnapshot(q, (querySnapshot) => {
          const timeEntriesArray = []
          // Go through each document and push its data to the timeEntriesArray
          querySnapshot.forEach((doc) => {
            // doc.data() returs the document data as an object
            timeEntriesArray.push({id: doc.id, ...doc.data()})
          })
          // Update the state with the fetched time entries
          setTimeEntries(timeEntriesArray)
        })
      } catch (e) {
        console.error(e)
      }
    }
    fetchTimeEntries()
    // Cleanup function runs when the component is unmounted or when a depency changes (e.g. month or year)
    return () => {
    // Stop listening to real-time Firestore updates to prevent memory leaks and duplicate listeners
      unsubscribe()
    }
  }, [currentMonth, currentYear])

  // Add new document to firestore collection 'timeEntries' with following data
  const addTimeEntry = async (data) => {
    try {
      const docRef = data.id
        ? doc(db, 'timeEntries', data.id) // If id, edit the existing doc
        : doc(collection(db, 'timeEntries')) // Create new doc if no id

      await toast.promise(
        setDoc(docRef, {
        startTime: data.startTime,
        endTime: data.endTime,
        project: data.project,
        projectId: data.projectId,
        kilometers: data.kilometers,
        travelRate: data.travelRate,
        hours: data.hours,
        memo: data.memo,
        userId: currentUser
        }),
        {
          loading: 'Tallennetaan tunteja..',
          success: 'Tuntien lisääminen onnistui!',
          error: 'Tuntien lisääminen epäonnistui'
        }
      )
      // Increment the selected project's hours when a time entry is added
      const projectRef = doc(db, 'projects', data.projectId)
      await updateDoc(projectRef, {
        hours: increment(data.hours),
        kilometers: increment(data.kilometers)
      })
    } catch (e) {
      console.error(e)
    }
  }

  // Delete a time entry from Firestore
  const deleteTimeEntry = async (entry) => {
    try {
      await toast.promise(
        deleteDoc(doc(db, 'timeEntries', entry.id)),
        {
          loading: 'Poistetaan tunteja..',
          success: 'Tuntien poisto onnistui!',
          error: 'Tuntien poistaminen epäonnistui'
        }
      )
      // Decrement the selected project's hours when a time entry is deleted
      if (entry.projectId) {
        const projectRef = doc(db, 'projects', entry.projectId)
          await updateDoc(projectRef, {
            hours: increment(-(entry.hours))
        })
      }

    } catch (e) {
      console.error(e)
    }
  }

  return {
    addTimeEntry,
    deleteTimeEntry
  }
}

export default useCalendarTimeEntries