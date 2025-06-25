import "./Sidebar.css"
import { Link } from "react-router-dom";
import * as Fi from "react-icons/fi";

const Sidebar = ({setSidebarOpen, isMobile}) => {

  const routes = [
    { name: "Etusivu", path: "/Etusivu", IconName: <Fi.FiHome /> },
    { name: "Ajanhallinta", path: "/Ajanhallinta", IconName: <Fi.FiCalendar /> },
    { name: "Projektit", path: "/Projektit", IconName: <Fi.FiFolder /> },
    { name: "Matkat", path: "/Matkat", IconName: <Fi.FiBriefcase /> },
  ]
  const extraMobileRoutes = [
    { name: 'Asetukset', path: 'Asetukset', IconName: <Fi.FiSettings /> },
    { name: 'Profiili', path: 'Profiili', IconName: <Fi.FiUser /> }
  ]

  const visibleRoutes = isMobile ? [...routes, ...extraMobileRoutes] : routes;

  return (
    <div className="sidebar">
      <div className="sidebar-items">
        {isMobile && <button className="close-icon" onClick={() => setSidebarOpen(false)}><Fi.FiX /></button>}
        {visibleRoutes.map((route, index) => (
          <Link key={index} to={route.path} className="item" onClick={() => {if (isMobile) setSidebarOpen(false)}}>
            <span className="icon">{route.IconName}</span>{route.name}
          </Link>
        ))}
      </div>
      
    </div>
  )
}

export default Sidebar