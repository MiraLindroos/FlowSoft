import './App.css'
import Navbar from "./components/Navbar/Navbar"
import Sidebar from "./components/Sidebar/Sidebar"
import AppRoutes from "./AppRoutes"
import { Routes, Route, Navigate } from "react-router-dom"
import Login from './pages/Login/Login'
import useModal from "./hooks/useModal"
import useSidebarAndNavbar from "./hooks/useSidebarAndNavbar"
import useAuth from "./hooks/useAuth"
import Modal from "./components/Modal/Modal"
import ScrollToTop from './components/ScrollToTop/ScrollToTop'

function App() {
  const {
    showModal,
    modalContent,
    openModal,
    closeModal,
    cancelButton,
    confirmButton
  } = useModal()

  const {
    isLoggedIn,
    authChecked,
    handleLogOut
  } = useAuth(openModal, closeModal, cancelButton, confirmButton)

  const {
    isSidebarOpen,
    setSidebarOpen,
    isMobile, navbarItems,
    sidebarVisibleRoutes
  } = useSidebarAndNavbar(handleLogOut)

  if (!authChecked) {
    return (
      <div className='loading'>Ladataan...</div>
    )
  }

  return (
    <div className="App">
      {/* If user has not logged in, show login page */}
      {!isLoggedIn ? (
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Kirjaudu" element={<Login />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      ) : (
        <>
          <Navbar
            setSidebarOpen={setSidebarOpen}
            isMobile={isMobile}
            onLogOutClick={handleLogOut}
            items={navbarItems}
            logo='FlowSoft'
          />
          <div className="main-content-area">
            {/* If isSidebarOpen is true, show the sidebar */}
            {isSidebarOpen &&
              <Sidebar
                setSidebarOpen={setSidebarOpen}
                isMobile={isMobile}
                onLogOutClick={handleLogOut}
                visibleRoutes={sidebarVisibleRoutes}
              />
            }
            <main className="page-content">
              <ScrollToTop />
              <AppRoutes />
              {showModal &&
                <Modal
                  message={modalContent.message}
                  children={modalContent.children}
                  onConfirm={modalContent.onConfirm}
                  onCancel={modalContent.onCancel}
                  cancelButton={modalContent.cancelButton}
                  confirmButton={modalContent.confirmButton}
                  width={modalContent.width}
                />
              }
            </main>
          </div>
        </>
      )}
    </div>
  )
}

export default App
