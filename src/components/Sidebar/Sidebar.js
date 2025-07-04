import "./Sidebar.css"
import { Link } from "react-router-dom"
import { FiX } from "react-icons/fi"

const Sidebar = ({setSidebarOpen, isMobile, visibleRoutes}) => {
  return (
    <div className="sidebar">
      <div className="sidebar-items">
        {/* If isMobile is true, show a close icon on the sidebar */}
        {isMobile && <button className="close-icon" onClick={() => setSidebarOpen(false)}><FiX /></button>}
        {visibleRoutes.map((route, index) =>
          route.path ? (
            // Close the sidebar on mobile when a navigation link is clicked
            <Link key={index} to={route.path} className="item" onClick={() => {if (isMobile) setSidebarOpen(false)}}>
              <span className="icon">{route.IconName}</span>{route.name}
            </Link>
          ) : (
          <button
            key={index}
            className="item"
            style={{backgroundColor: "white", border: "none"}}
            onClick={() => {
              route.onClick()
              // if (isMobile) setSidebarOpen(false)
            }}
          >
            <span className="icon">{route.IconName}</span>{route.name}
          </button>)
        )}
      </div>
    </div>
  )
}

export default Sidebar