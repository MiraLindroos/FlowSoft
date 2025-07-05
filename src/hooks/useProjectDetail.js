import { doc, getDoc } from "firebase/firestore"
import { db } from "../firebase/index"
import { useEffect, useState } from "react"

const useProjectDetail = (id) => {
  const [project, setProject] = useState()
  useEffect(() => {
    const fetchProject = async () => {
      const projectRef = doc(db, "projects", id)
      const projectDoc = await getDoc(projectRef)

      if (projectDoc.exists()) {
        console.log('doc data: ', projectDoc.data())
        setProject(projectDoc.data())
      } else {
        console.log('cant find document')
      }
    }
    fetchProject()
  }, [id])

  return {
    project
  }
}

export default useProjectDetail