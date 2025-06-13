import "./Sidebar.css"
import { Link } from "react-router-dom";

const Sidebar = () => {

  const routes = [
    { name: "Etusivu", path: "/Etusivu" },
    { name: "Ajanhallinta", path: "/Ajanhallinta" },
    { name: "Projektit", path: "/Projektit" },
  ]

  return (
    <div className="sidebar">
      {routes.map((route, index) => (
        <Link key={index} to={route.path}>
          {route.name}
        </Link>
      ))}
    </div>
  )
}

export default Sidebar