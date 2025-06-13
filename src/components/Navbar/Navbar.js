import './Navbar.css'
import { Link } from "react-router-dom";
import { FiUser, FiSettings } from "react-icons/fi";

const Navbar = () => {
  const items = [
    { name: 'asetukset', path: 'Asetukset', iconName: <FiSettings /> },
    { name: 'profiili', path: 'Profiili', iconName: <FiUser /> }
  ]

  return (
    <div className="navbar">
      <p className="logo">FlowSoft</p>
      <div className="navbar-left">
        {items.map((item, index) => (
          <Link key={index} to={item.path}>{item.iconName}</Link>
        ))}
      </div>
    </div>
  )
}

export default Navbar;