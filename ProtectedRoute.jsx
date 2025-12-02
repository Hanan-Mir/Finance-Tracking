import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./src/context/AuthContext";
import { useEffect, useState } from "react";
import Loading from "./src/components/Loading";
import AsideBar from "./src/components/PrivateComponents/AsideBar";
import { useDarkMode } from "./src/context/DarkModeContext";

//protect route for only authenticated users will let the user to access the app
const ProtectedRoute = ({children}) => {
  const { session } = useAuth();
  const {isDarkMode,setDarkMode}=useDarkMode();
  const [loading, setLoading] = useState(true);

  const isAuthenticated = !!session;
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);
  if (loading) {
    return <Loading />;
  }
  //Only auhenticated users can access the supabase
  if (isAuthenticated) {
    return (
      <div className="w-screen flex overflow-hidden md:justify-between ">
        <div className={`w-[15%] ${isDarkMode?'dark':''} `}>
          <AsideBar />
        </div>
        <div className={`w-[84%] ${isDarkMode?'dark':''} `}>
        {children}
        </div>
      </div>
    );
  } else {
    return <Navigate to="/login" replace />;
  }
};
export default ProtectedRoute;
