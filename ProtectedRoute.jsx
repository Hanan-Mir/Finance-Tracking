import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./src/context/AuthContext"

const ProtectedRoute=()=>{
    const {session}=useAuth();
    const isAuthenticated=!!session;
    if(isAuthenticated){
        return <Outlet />
    }else{
        return <Navigate to='/login' replace />
    }

}
export default ProtectedRoute