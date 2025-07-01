import { auth } from "../../firebase/index.js"
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth"
import { useState } from "react"

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  console.log(email)
  console.log(password)
  const signIn = (e) => {
    e.preventDefault() // Prevents the page from loading again
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user
        console.log(user)
        console.log('täällä')
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        console.log(errorCode)
        console.log(errorMessage)
      })
  };

  return (
    <form onSubmit={signIn}>
      <h1>Kirjaudu sisään</h1>
      <input
        placeholder="sähköposti"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder="salasana"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  )
}

export default Login;