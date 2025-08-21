import { collection, setDoc, doc, deleteDoc, onSnapshot, query, where } from "firebase/firestore"
import { db } from "../firebase/index"
import { useEffect } from "react"
import toast from "react-hot-toast"
import { useAtomValue, useAtom } from 'jotai'
import { currentUserAtom, projectsAtom } from '../jotai/atoms'

const useProjects = () => {
  const currentUser = useAtomValue(currentUserAtom)
  const [projects, setProjects] = useAtom(projectsAtom)

  useEffect(() => {
    // Initialize an empty unsubscribe function to be safely called later
    // This prevents "unsubscribe is not a function" errors if for some reason onSnapshot fails or doesn't run
    let unsubscribe = () => {}
    // Fetch projects from Firestore and listen for real-time updates
    try {
      // Get all documents for the current user from the projects collection
      const q = query(
        collection(db, "projects"),
        where('userId', '==', currentUser)
      )
      // Start listening to real-time updates from Firestore
      unsubscribe = onSnapshot(q, (querySnapshot) => {
        const projectsArray = []
        // Go through each document and push its data to the projectsArray
        querySnapshot.forEach((doc) => {
          // doc.data() returs the document data as an object
          projectsArray.push({ id: doc.id, ...doc.data()})
        })
        // Update the state with the fetched projects
        setProjects(projectsArray)
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

  // Filter projects that have onGoing=true and save the projects name + hours + id
  const activeProjects = projects
    .filter((p) => p.onGoing)
    .map((p) => ({name: p.name, value: p.hours, id: p.id}))

  // Function for adding and updating project data to Firestore
  const addProject = async (data) => {
    try {
      const docRef = data.id
      ? doc(db, 'projects', data.id) // If id, edit the existing doc
      : doc(collection(db, 'projects')) // Create new doc if no id

      // Modifying startDate to start at 00:00 and endDate to end at 23:59
      const startDate = new Date(data.startDate)
      startDate.setHours(0, 0, 0, 0)
      const endDate = new Date(data.endDate)
      endDate.setHours(23, 59, 59, 999)

      const projectData = {
        name: data.name,
        startDate: data.startDate ? startDate : '',
        endDate: data.endDate ? endDate : '',
        hourRate: data.hourRate,
        fixedRate: data.fixedRate,
        memo: data.memo,
        modified: new Date(),
        onGoing: data.onGoing,
        userId: currentUser,
        contact: data.contact,
        reference: data.reference,
        operator: data.operator,
      }

      // Add hours field with value 0 only if project is new
      if (!data.id) {
        projectData.hours = 0
        projectData.kilometers = 0
      }

      await toast.promise(
        // Update the given fields and leave the rest as they are
        setDoc(docRef, projectData, {merge: true}),
        {
          loading: 'Tallennetaan...',
          success: 'Tallennus onnistui!',
          error: 'Tallennus epäonnistui'
        }
      )
    } catch (e) {
      console.error(e)
    }
  }

  // Function for deleting a project from Firestore
  const deleteProject = async (id) => {
    try {
      await toast.promise(
        deleteDoc(doc(db, 'projects', id)),
        {
          loading: 'Poistetaan...',
          success: 'Poisto onnistui!',
          error: 'Posto epäonnistui'
        }
      )
    } catch (e) {
      console.error(e)
    }
  }

  return {
    activeProjects,
    addProject,
    deleteProject
  }
}

export default useProjects