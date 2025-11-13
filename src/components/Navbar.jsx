import { NavLink } from "react-router-dom"
import { navLinks } from "../../constants"

function Navbar() {
    return (
        <nav>
            <div>
                <a href="/">
                    <img src="/images/logo.png" alt="" />
                </a>
                <ul>
                    {navLinks.map((links)=>(
                        <li key={links.id}>
                            <NavLink  to={links.id}>{links.title}</NavLink>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
        // <header >
        //     <div>
        //         <div>
        //             <img src="/images/logo.png" alt="logo" />

        //         </div>
        //         <nav>
        //             <NavLink to='/'>Home</NavLink>
        //             <NavLink to='/pricing'>Pricing</NavLink>
        //             <NavLink to='/about'>About us</NavLink>
        //             <NavLink to='/login'>Login</NavLink>
        //         </nav>
        //     </div>
            
        // </header>
    )
}

export default Navbar
