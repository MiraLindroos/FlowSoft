import "./Sidebar.css"
import { Link } from "react-router-dom";
import { FiCalendar, FiHome, FiFolder } from "react-icons/fi";

const Sidebar = () => {

  const routes = [
    { name: "Etusivu", path: "/Etusivu", IconName: <FiHome /> },
    { name: "Ajanhallinta", path: "/Ajanhallinta", IconName: <FiCalendar /> },
    { name: "Projektit", path: "/Projektit", IconName: <FiFolder /> },
  ]

  return (
    <div className="sidebar">
      <div className="sidebar-items">
        {routes.map((route, index) => (
          <Link key={index} to={route.path} className="item">
            <span style={{marginRight: '10px', verticalAlign: 'middle'}}>{route.IconName}</span>{route.name}
          </Link>
        ))}
      </div>
      
    </div>
  )
}

export default Sidebar