import { NavLink } from "react-router-dom"

function Navbar() {
    return (
        <header >
            <div>
                <div>
                    <img src="/images/logo.png" alt="logo" />

                </div>
                <nav>
                    <NavLink to='/'>Home</NavLink>
                    <NavLink to='/pricing'>Pricing</NavLink>
                    <NavLink to='/about'>About us</NavLink>
                    <NavLink to='/login'>Login</NavLink>
                </nav>
            </div>
            
        </header>
    )
}

export default Navbar
