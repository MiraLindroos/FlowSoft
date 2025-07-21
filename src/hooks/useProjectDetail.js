import { doc, getDoc } from "firebase/firestore"
import { db } from "../firebase/index"
import { useEffect, useState } from "react"

const useProjectDetail = (id) => {
  const [project, setProject] = useState()
  useEffect(() => {
    // Async function to fetch the project from Firestore
    const fetchProject = async () => {
      try {
        // Find project document with given id
        const projectRef = doc(db, "projects", id)
        const projectDoc = await getDoc(projectRef)
        // If the document exists, update the state with its data
        if (projectDoc.exists()) {
          setProject({ id: projectDoc.id, ...projectDoc.data()})
        } else {
          console.log('cant find document')
        }
      } catch (e) {
        console.error(e)
      }
    }
    fetchProject()
  }, [id])

  return {
    project
  }
}

export default useProjectDetail