import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/index"
import { useEffect, useState } from "react";

const useProjectsList = () => {
  const [projects, setProjects] = useState([])

  useEffect(() => {
    // Async function to fetch projects from Firestore
    const fetchProjects =  async () => {
      try {
        // Get all documents from the projects collection
        const projectsCollection = await getDocs(collection(db, "projects"));
        const projectsArray = []
        // Go through each document and push its data to the projectsArray
        projectsCollection.forEach((doc) => {
          // doc.data() returs the document data as an object
          projectsArray.push({ id: doc.id, ...doc.data()})
        });
        // Update the state with the fetched projects
        setProjects(projectsArray)
      } catch (e) {
        console.error(e)
      }
    }
    fetchProjects()
  }, [])

  const activeProjects = projects
    .filter((p) => p.onGoing)
    .map((p) => ({name: p.name, value: p.hours}))

  return {
    projects,
    activeProjects
  }
}

export default useProjectsList