import { useState, useEffect } from "react"
import './App.css';
import Home from './pages/Home/Home'
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import { Routes, Route } from "react-router-dom";
import TimeManagement from "./pages/TimeManagement/TimeManagement";
import Projects from "./pages/Projects/Projects";
import Settings from './pages/Settings/Settings';
import Profile from './pages/Profile/Profile';
import Travel from './pages/Travel/Travel';


function App() {
  // If screen width is 898px or wider, set isSidebarOpen to true
  const [isSidebarOpen, setSidebarOpen] = useState(() => window.innerWidth >= 898);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 898)

  useEffect(() => {
    // Check window width and update sidebar state
    const handleResize = () => {
      // If screen width is 898 or bigger, set isSidebarOpen to true, otherwise it's false
      setSidebarOpen(window.innerWidth >= 898);
      setIsMobile(window.innerWidth < 898);
    }
    // Add a listener to run handleResize whenever the window is resized
    window.addEventListener('resize', handleResize);
    // Call handleResize to set the correct initial state
    handleResize();
    // Remove the event listener when component unmounts
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="App">
      <Navbar setSidebarOpen={setSidebarOpen} isMobile={isMobile}/>
      <div className="main-content-area">
        {/* If isSidebarOpen is true, show the sidebar */}
        {isSidebarOpen && <Sidebar setSidebarOpen={setSidebarOpen} isMobile={isMobile}/>}
        <main className="page-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Etusivu" element={<Home />} />
            <Route path="/Ajanhallinta" element={<TimeManagement />} />
            <Route path="/Projektit" element={<Projects />} />
            <Route path="/Asetukset" element={<Settings />} />
            <Route path="/Profiili" element={<Profile />} />
            <Route path="/Matkat" element={<Travel />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
