import { useEffect } from "react"
import { db } from "../firebase/index"
import { doc, getDoc } from "firebase/firestore"
import { useAtomValue } from "jotai"
import { currentUserAtom } from "../jotai/atoms"
import { useState } from "react"

const useUserInfo = () => {
  const [userInfo, setUserInfo] = useState(null)

  const currentUser = useAtomValue(currentUserAtom)
  useEffect(() => {
    const fetchUserInfo = async () => {
      const userRef = doc(db, 'users', currentUser)
      const userDoc = await getDoc(userRef)
      if (userDoc.exists()) {
        setUserInfo({id: userDoc.id, ...userDoc.data()})
      } else {
        console.log('jotain meni vikaan')
      }
    }

    fetchUserInfo()
  }, [])

  return {
    userInfo
  }
}

export default useUserInfo