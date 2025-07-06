import './Navbar.css'
import { Link } from "react-router-dom"
import { FiMenu, FiLogOut } from "react-icons/fi"

const Navbar = ({setSidebarOpen, isMobile, onLogOutClick, items, logo}) => {

  return (
    <div className="navbar">
      <Link className="navbar-logo" to={'/'}>{logo}</Link>
      <div className="navbar-left">
        {/* If isMobile is false aka the window width is over 897px
            we will show profile icon on the navbar
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