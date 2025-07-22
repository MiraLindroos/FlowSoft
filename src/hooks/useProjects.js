import { collection, getDocs, setDoc, doc, deleteDoc } from "firebase/firestore"
import { db } from "../firebase/index"
import { useEffect, useState } from "react"

const useProjects = (currentUser) => {
  const [projects, setProjects] = useState([])

  useEffect(() => {
    // Async function to fetch projects from Firestore
    const fetchProjects =  async () => {
      try {
        // Get all documents from the projects collection
        const projectsCollection = await getDocs(collection(db, "projects"))
        const projectsArray = []
        // Go through each document and push its data to the projectsArray
        projectsCollection.forEach((doc) => {
          // doc.data() returs the document data as an object
          projectsArray.push({ id: doc.id, ...doc.data()})
        })
        // Update the state with the fetched projects
        setProjects(projectsArray)
      } catch (e) {
        console.error(e)
      }
    }
    fetchProjects()
  }, [])

  // Filter projects that have onGoing=true and save the projects name + hours
  const activeProjects = projects
    .filter((p) => p.onGoing)
    .map((p) => ({name: p.name, value: p.hours, id: p.id}))

  const addProject = async (data) => {
    const docRef = data.id
    ? doc(db, 'projects', data.id) // If id, edit the existing doc
    : doc(collection(db, 'projects')) // Create new doc if no id

    await setDoc(docRef, {
      name: data.name,
      startDate: new Date(data.startDate),
      endDate: new Date(data.endDate),
      hourRate: data.hourRate,
      fixedRate: data.fixedRate,
      memo: data.memo,
      created: new Date(),
      onGoing: (new Date(data.startDate) <= new Date() && new Date() <= new Date(data.endDate)) ? true : false,
      userId: currentUser,
      hours: 0
    })
  }

  const deleteProject = async (id) => {
    await deleteDoc(doc(db, 'projects', id))
  }

  return {
    projects,
    activeProjects,
    addProject,
    deleteProject
  }
}

export default useProjects