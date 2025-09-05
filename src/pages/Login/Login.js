import { auth } from "../../firebase/index"
import { signInWithEmailAndPassword } from "firebase/auth"
import { useState } from "react"
import "./Login.css"
import toast, { Toaster } from "react-hot-toast"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const signIn = (e) => {
    e.preventDefault() // Prevents the page from loading again
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        console.log(errorCode)
        console.log(errorMessage)
        toast.error("Sähköposti tai salasana väärin", {duration: 5000})
      })
  }

  return (
    <div className="login-page">
      <h2>FlowSoft</h2>
      <form onSubmit={signIn} className="login-form">
        <h3>Kirjaudu sisään</h3>
        <input
          placeholder="Sähköposti"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="Salasana"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Kirjaudu</button>
      </form>
      <Toaster />
    </div>
  )
}

export default Login