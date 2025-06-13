import './App.css';
import Home from './pages/Home/Home'
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="main-content-area">
        <Sidebar />
        <Home />
      </div>
    </div>
  );
}

export default App;
