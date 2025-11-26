import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./src/context/AuthContext";
import { useEffect, useState } from "react";
import Loading from "./src/components/Loading";

//protect route for only authenticated users will let the user to access the app
const ProtectedRoute = () => {
  const { session } = useAuth();
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
    return <Outlet />;
  } else {
    return <Navigate to="/login" replace />;
  }
};
export default ProtectedRoute;
