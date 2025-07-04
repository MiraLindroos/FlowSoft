import { useState, useEffect } from "react"
import * as Fi from "react-icons/fi"

const useSidebarAndNavbar = (handleLogOut) => {
  // If screen width is 898px or wider, set isSidebarOpen to true
  const [isSidebarOpen, setSidebarOpen] = useState(() => window.innerWidth >= 898)
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 898)

  useEffect(() => {
    // Check window width and update sidebar state
    const handleResize = () => {
      // If screen width is 898 or bigger, set isSidebarOpen to true, otherwise it's false
      setSidebarOpen(window.innerWidth >= 898)
      setIsMobile(window.innerWidth < 898)
    }
    // Add a listener to run handleResize whenever the window is resized
    window.addEventListener('resize', handleResize)
    // Call handleResize to set the correct initial state
    handleResize()

    // Remove the resize listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const navbarItems = [
    { name: 'asetukset', path: 'Asetukset', iconName: <Fi.FiSettings /> },
    { name: 'profiili', path: 'Profiili', iconName: <Fi.FiUser /> }
  ]

  // Array of routes that are always shown (both mobile and desktop)
  const sidebarRoutes = [
    { name: "Etusivu", path: "/Etusivu", IconName: <Fi.FiHome /> },
    { name: "Ajanhallinta", path: "/Ajanhallinta", IconName: <Fi.FiCalendar /> },
    { name: "Projektit", path: "/Projektit", IconName: <Fi.FiFolder /> },
    { name: "Matkat", path: "/Matkat", IconName: <Fi.FiBriefcase /> },
  ]
  // Array of routes that are shown only on mobile view
  const extraMobileRoutes = [
    { name: 'Asetukset', path: 'Asetukset', IconName: <Fi.FiSettings /> },
    { name: 'Profiili', path: 'Profiili', IconName: <Fi.FiUser /> },
    { name: 'Kirjaudu ulos', onClick: handleLogOut, IconName: <Fi.FiLogOut />},
  ]
  // If isMobile is true, show both routes + extraMobileRoutes
  const sidebarVisibleRoutes = isMobile ? [...sidebarRoutes, ...extraMobileRoutes] : sidebarRoutes

  return {
    isSidebarOpen,
    setSidebarOpen,
    isMobile,
    navbarItems,
    sidebarVisibleRoutes,
  }
}

export default useSidebarAndNavbar