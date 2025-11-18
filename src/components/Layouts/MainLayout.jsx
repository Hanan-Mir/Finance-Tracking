import { Outlet, useLocation } from "react-router-dom"
import Navbar from "../Navbar"

function MainLayout() {
    const location=useLocation();
    const noNavBarPaths=['/login','/signUp','/forget-password'];
    const showNavbar=!noNavBarPaths.includes(location.pathname)
    return (
        <>
        {showNavbar && <Navbar />}
        <main >
            <Outlet  />
            
        </main>
        </>
    )
}

export default MainLayout
