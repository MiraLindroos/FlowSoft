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
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const deviceWidth = window.innerWidth;
    if (deviceWidth < 768) {
      setSidebarOpen(false);
    }
    console.log(deviceWidth)
  }, [])
  return (
    <div className="App">
      <Navbar setIsSidebarOpen={setSidebarOpen}/>
      <div className="main-content-area">
        {isSidebarOpen && <Sidebar isSidebarOpen={isSidebarOpen}/>}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Etusivu" element={<Home />} />
          <Route path="/Ajanhallinta" element={<TimeManagement />} />
          <Route path="/Projektit" element={<Projects />} />
          <Route path="/Asetukset" element={<Settings />} />
          <Route path="/Profiili" element={<Profile />} />
          <Route path="/Matkat" element={<Travel />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
