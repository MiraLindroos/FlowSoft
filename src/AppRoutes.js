import Home from './pages/Home/Home'
import { Routes, Route, Navigate } from "react-router-dom"
import TimeManagement from "./pages/TimeManagement/TimeManagement"
import Projects from "./pages/Projects/Projects"
import Settings from './pages/Settings/Settings'
import Profile from './pages/Profile/Profile'
import Travel from './pages/Travel/Travel'

const AppRoutes = ({ setIsLoggedIn }) => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Etusivu" element={<Home setIsLoggedIn={setIsLoggedIn}/>} />
      <Route path="/Ajanhallinta" element={<TimeManagement />} />
      <Route path="/Projektit" element={<Projects />} />
      <Route path="/Asetukset" element={<Settings />} />
      <Route path="/Profiili" element={<Profile />} />
      <Route path="/Matkat" element={<Travel />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}

export default AppRoutes