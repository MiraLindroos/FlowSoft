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
    const docRef = data.id
    ? doc(db, 'projects', data.id) // If id, edit the existing doc
    : doc(collection(db, 'projects')) // Create new doc if no id

    await toast.promise(
      setDoc(docRef, {
        name: data.name,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
        hourRate: data.hourRate,
        fixedRate: data.fixedRate,
        memo: data.memo,
        modified: new Date(),
        onGoing: (new Date(data.startDate) <= new Date() && new Date() <= new Date(data.endDate)) ? true : false,
        userId: currentUser,
        hours: 0
      }),
      {
        loading: 'Tallennetaan...',
        success: 'Tallennus onnistui!',
        error: 'Tallennus epäonnistui'
      }
    )
  }

  // Function for deleting a project from Firestore
  const deleteProject = async (id) => {
    await toast.promise(
      deleteDoc(doc(db, 'projects', id)),
      {
        loading: 'Poistetaan...',
        success: 'Poisto onnistui!',
        error: 'Posto epäonnistui'
      }
    )
  }

  return {
    activeProjects,
    addProject,
    deleteProject
  }
}

export default useProjects