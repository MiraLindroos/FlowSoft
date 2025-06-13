import './App.css';
import Home from './pages/Home/Home'
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import { Routes, Route } from "react-router-dom";
import TimeManagement from "./pages/TimeManagement/TimeManagement";
import Projects from "./pages/Projects/Projects";


function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="main-content-area">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Etusivu" element={<Home />} />
          <Route path="/Ajanhallinta" element={<TimeManagement />} />
          <Route path="/Projektit" element={<Projects />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
