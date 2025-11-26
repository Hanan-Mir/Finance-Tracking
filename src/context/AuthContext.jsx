import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [session, setSession] = useState();
  const [passwordResetSession,setPasswordResetSession]=useState(false);

  //function for SignUp
  const signUpNewUser = async ({ email, password }) => {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
    if (error) {
      console.error("there was a problem signing up :", error);
      return { success: false, error };
    }
    return { success: true, data };
  };

  //function for SignIn
  const signIn = async ({ email, password }) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (error) {
      let errorType = "UNKNOWN";
      if (error.message.includes("Email not confirmed")) {
        errorType = "confirm Mail error";
      } else if (error.message.includes("Invalid login credentials")) {
        errorType = "Invalid login credentials";
      }
      return {
        success: false,
        error: { message: error.message, type: errorType },
      };
    }
    return { success: true, data,state:{fromConfirmEmail:true} };
  };
  //Login with google
  const signInWithGoogle=async()=>{
    const { data, error } = await supabase.auth.signInWithOAuth({
  provider: 'google',
  options: {
    redirectTo:`${window.location.origin}/dashboard`
  },
  
})
if(error){
    return {
        success: false,
        error: { message: error.message, type: "OAuth sign-in error" },
      };
  }

  }
  //function for signOut
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("There was an error:", error);
    }
  };
  //function for reset password
  const resetPasswordForEmail=async (email)=>{
    const {data,error}=await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`, // Where user goes after clicking email link
    });
    if(error){
      return {success:false,error}
    }
      setPasswordResetSession(true)
    return {success:true,data}
  
  }
//function to update password
const updatePassword=async (updatedPassword)=>{
  const { data, error } = await supabase.auth.updateUser({
      password: updatedPassword,
    });
     if(error){
      return {success:false,error}
    }
    return {success:true,data}
}
//This useEffect is to sync app with the supabase
  useEffect(() => {
  // Get initial session
  supabase.auth.getSession().then(({ data: { session } }) => {
    setSession(session);
  });

  // Listen for auth changes (including OAuth redirects)
  const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
    setSession(session);
  });

  // Cleanup function to unsubscribe when component unmounts
  return () => subscription.unsubscribe();
}, []);

  return (
    <AuthContext.Provider value={{ session, signUpNewUser, signOut, signIn,signInWithGoogle,resetPasswordForEmail,updatePassword,passwordResetSession,setPasswordResetSession }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  return useContext(AuthContext);
};
