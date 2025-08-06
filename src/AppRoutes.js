import Home from './pages/Home/Home'
import { Routes, Route, Navigate } from "react-router-dom"
import TimeManagement from "./pages/TimeManagement/TimeManagement"
import Projects from "./pages/Projects/Projects"
import ProjectDetailPage from "./pages/Projects/ProjectDetailPage"
import Profile from './pages/Profile/Profile'
import Travels from './pages/Travels/Travels'
import TravelDetailPage from "./pages/Travels/TravelDetailPage"

const AppRoutes = ({ setIsLoggedIn }) => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Etusivu" element={<Home setIsLoggedIn={setIsLoggedIn} />} />
      <Route path="/Ajanhallinta" element={<TimeManagement />} />
      <Route path="/Projektit" element={<Projects />} />
      <Route path="/Projekti/:id" element={<ProjectDetailPage />} />
      <Route path="/Profiili" element={<Profile />} />
      <Route path="/Matkat" element={<Travels />} />
      <Route path="/Matka/:id" element={<TravelDetailPage />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}

export default AppRoutes