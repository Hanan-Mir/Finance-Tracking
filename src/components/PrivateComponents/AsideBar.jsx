import { Link } from "react-router-dom";
import AsideComponent from "./AsideComponent";
import { useAuth } from "../../context/AuthContext";
import { sideBarLinks } from "../../../constants";
import { useDarkMode } from "../../context/DarkModeContext";

function AsideBar() {
  const { session, signOut } = useAuth();
  const {isDarkMode,setDarkMode}=useDarkMode();
  


  return (
    <aside className="fixed shadow-box w-60 h-screen flex md:flex-col items-center dark:bg-slate-300 ">
      <div className="h-full flex md:flex-col md:justify-between md:gap-5 relative">
        <div className="absolute md:-right-8">
         <img
                src={isDarkMode?'/images/lightMode.png':'/images/moon.png'}
                alt=""
                className="w-12 h-12 p-2  hover:bg-gray-200 hover:rounded-full"
                onClick={()=>setDarkMode()}
              />
              </div>
        <div className="flex md:flex-col md:items-center gap-2 mt-6">
          <img src="/images/user.png" alt="" className="w-25" />
          <div className="flex w-full md:flex-col md:items-center gap-5">
            <h1 className="text-[1rem] font-bold">
          Welcome, {session.user.user_metadata?.name?.toUpperCase() || session.user.user_metadata.email.slice(0,session.user.user_metadata.email.indexOf('@'))}
            </h1>
            
          </div>
        </div>
{/* sidebar links from the index.js file as these are static */}
        {sideBarLinks.map(({ linkTo, imgAddress, linkLabel }) => (
          <AsideComponent
            linkTo={linkTo}
            imgAddress={imgAddress}
            linkLabel={linkLabel}
          />
        ))}
        <p onClick={() => signOut()} className="flex md:items-center gap-4 hover:bg-gray-200 rounded-[8px] hover:cursor-pointer">
          <img
                src="/images/logout.png"
                alt=""
                className="w-12 h-12 p-2  "
                
              />
              <span className="text-[1.2rem]">Signout</span>

        </p>

        <Link to="/">
          {" "}
          <img src="/images/logo.png" alt="" className="w-30" />{" "}
        </Link>
      </div>
    </aside>
  );
}

export default AsideBar;
