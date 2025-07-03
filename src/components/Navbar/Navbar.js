import './Navbar.css'
import { Link } from "react-router-dom"
import { FiUser, FiSettings, FiMenu, FiLogOut } from "react-icons/fi"

const Navbar = ({setSidebarOpen, isMobile, onLogOutClick}) => {
  // Array of items to show in navbar
  const items = [
    { name: 'asetukset', path: 'Asetukset', iconName: <FiSettings /> },
    { name: 'profiili', path: 'Profiili', iconName: <FiUser /> }
  ]

  return (
    <div className="navbar">
      <Link className="navbar-logo" to={'/'}>FlowSoft</Link>
      <div className="navbar-left">
        {/* If isMobile is false aka the window width is over 897px
            we will show settings and profile icons on the navbar
            otherwise we show a menu icon that opens the sidebar menu
        */}
        {!isMobile ? <>{items.map((item, index) => (
          <Link key={index} to={item.path}>{item.iconName}</Link>
        ))} <FiLogOut onClick={onLogOutClick}/></>: <Link onClick={() => setSidebarOpen(true)}><FiMenu/></Link>}
      </div>
    </div>
  )
}

export default Navbar