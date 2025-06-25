import "./Sidebar.css"
import { Link } from "react-router-dom";
import * as Fi from "react-icons/fi";

const Sidebar = ({setSidebarOpen, isMobile}) => {
  // Array of routes that are always shown (both mobile and desktop)
  const routes = [
    { name: "Etusivu", path: "/Etusivu", IconName: <Fi.FiHome /> },
    { name: "Ajanhallinta", path: "/Ajanhallinta", IconName: <Fi.FiCalendar /> },
    { name: "Projektit", path: "/Projektit", IconName: <Fi.FiFolder /> },
    { name: "Matkat", path: "/Matkat", IconName: <Fi.FiBriefcase /> },
  ]
  // Array of routes that are shown only on mobile view
  const extraMobileRoutes = [
    { name: 'Asetukset', path: 'Asetukset', IconName: <Fi.FiSettings /> },
    { name: 'Profiili', path: 'Profiili', IconName: <Fi.FiUser /> }
  ]
  // If isMobile is true, show both routes + extraMobileRoutes
  const visibleRoutes = isMobile ? [...routes, ...extraMobileRoutes] : routes;

  return (
    <div className="sidebar">
      <div className="sidebar-items">
        {/* If isMobile is true, show a close icon on the sidebar */}
        {isMobile && <button className="close-icon" onClick={() => setSidebarOpen(false)}><Fi.FiX /></button>}
        {visibleRoutes.map((route, index) => (
          // Close the sidebar on mobile when a navigation link is clicked
          <Link key={index} to={route.path} className="item" onClick={() => {if (isMobile) setSidebarOpen(false)}}>
            <span className="icon">{route.IconName}</span>{route.name}
          </Link>
        ))}
      </div>
      
    </div>
  )
}

export default Sidebar