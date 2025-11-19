import { NavLink } from "react-router-dom";
import { navLinks } from "../../constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useRef } from "react";


function Navbar() {
    gsap.registerPlugin(ScrollTrigger)
    const navRef=useRef(null);
    useGSAP(()=>{
    gsap.to('nav',{
        backgroundColor:'transparent',
        backdropFilter:'blur(15px)',
        borderBottom:'1px solid #057250',

        duration:'1',
        ease:'power1.inOut',
        scrollTrigger:{
            trigger:'nav',
            start:'bottom 5px',
            end:'top top',
            scrub:true,
        }
    })

    },[])
    
  
 
  return (
    <nav ref={navRef}>
      <div className="navigation-bar">
        <a href="/">
          <img src="/images/logo.png" alt="" />
        </a>
        <ul>
          {navLinks.map((links) => (
            <li key={links.id}>
              <NavLink to={links.id}>{links.title}</NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
   
  );
}

export default Navbar
