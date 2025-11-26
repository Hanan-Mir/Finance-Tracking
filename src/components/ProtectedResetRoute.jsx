import { useEffect, useState } from "react"
import { supabase } from "../../supabaseClient";
import { Navigate } from "react-router-dom";
import Loading from "./Loading";

//This route is to restrict the user from acessing the  reset password page...... 
function ProtectedResetRoute({children}) {
  const [isPasswordRecoverySession,setIspasswordRecoverySession]=useState(false);
  const [isChecking,setIsChecking]=useState(true);
  useEffect(()=>{
    const stored=localStorage.getItem('isPasswordRecoverySession')
    if(stored==='true'){
      setIspasswordRecoverySession(true);
      setIsChecking(false)
      return;
    }
    const {data:{subscription},}=supabase.auth.onAuthStateChange((event,session)=>{
      console.log(event)
      if(event==='PASSWORD_RECOVERY'){
        setIspasswordRecoverySession(true);
        localStorage.setItem('isPasswordRecoverySession','true')
      }
      setIsChecking(false)
    });
    
    
    return ()=>subscription.unsubscribe()
  },[])
  if(isChecking) {
  return <Loading />
}
  return isPasswordRecoverySession?children:<Navigate to='/login' replace />
}

export default ProtectedResetRoute
