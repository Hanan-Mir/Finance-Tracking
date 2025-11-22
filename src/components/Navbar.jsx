import { NavLink } from "react-router-dom";
import { navLinks } from "../../constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useRef } from "react";
import { animationsOnArrowKeys, enableKeyboardScrollSupport } from "../../HelperFunctions/gsapAnimations";

function Navbar() {
  gsap.registerPlugin(ScrollTrigger);

  const navRef = useRef(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
     
   gsap.fromTo(
      navRef.current,
      {
        backgroundColor: "rgba(0, 0, 0, 0)",
        backdropFilter: "blur(0px)",
        borderBottom: "1px solid rgba(5, 114, 80, 0)",
      },
      {
        backgroundColor: "rgba(182, 141, 141, 0.5)",
        backdropFilter: "blur(15px)",
        borderBottom: "1px solid #057250",
        duration: 1,
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: navRef.current,
          start: "top -2%",
          end: "+=100",
          scrub:true
         
        },
      }
    );
 
  }, []);

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

export default Navbar;
