import { Outlet, useLocation } from "react-router-dom"
import Navbar from "../Navbar"
import ScrollToTop from "./ScrollToTop";

function MainLayout() {
    const location=useLocation();
    const noNavBarPaths=['/login','/signUp','/forget-password','/confirm-email','/passwordreset-message','/reset-password'];
    const showNavbar=!noNavBarPaths.includes(location.pathname)
    return (
        <>
        {showNavbar && <Navbar />}
        <ScrollToTop />
        <main  >
            <Outlet  />
            
        </main>
        </>
    )
}

export default MainLayout
