import './Navbar.css'
import { Link } from "react-router-dom";
import { FiUser, FiSettings, FiMenu } from "react-icons/fi";

const Navbar = (props) => {
  const setSidebarOpen = props.setSidebarOpen
  const isSidebarOpen = props.isSidebarOpen
  const items = [
    { name: 'asetukset', path: 'Asetukset', iconName: <FiSettings /> },
    { name: 'profiili', path: 'Profiili', iconName: <FiUser /> }
  ]
  console.log(isSidebarOpen)
  return (
    <div className="navbar">
      <p className="logo">FlowSoft</p>
      <div className="navbar-left">
        {isSidebarOpen ? items.map((item, index) => (
          <Link key={index} to={item.path}>{item.iconName}</Link>
        )) : <Link onClick={() => setSidebarOpen(true)}><FiMenu/></Link>}
      </div>
    </div>
  )
}

export default Navbar;