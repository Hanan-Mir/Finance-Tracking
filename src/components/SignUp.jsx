import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

function SignUp() {
  const [email,setEmail]=useState();
  const [password,setPassword]=useState();
  const [confirmPassword,setConfirmPassword]=useState()
  const {session,signUpNewUser}=useAuth();
  const navigate=useNavigate();
 async function handleSignUp(e){
e.preventDefault();
try{
  if(password!==confirmPassword){
    console.log('mismatch in password')
    return
  }
  const result=await signUpNewUser({email,password});
  if(result.success){
  navigate('/confirm-email')
  }
}catch(error){
    console.log(error)
  }

  }
    return (
        <section id="signup">
            <div className="signupform text-[#324F65]">
             <Link href="/">   <img src="/images/logo.png" alt="" className="w-40 ml-[25%]" /> </Link>
                <h1 className="text-[2.5rem]"><span className="font-bold">Sign up</span>  to FinTrack</h1>
                <p className="ml-10 text-xl">Have an account? <a href="/login" className="text-[#9AEEAF]">Login here!</a></p>
                <div className="form">
                    <form action="" method="post" onSubmit={handleSignUp}>
                        <div className="flex md:flex-col mt-3">
              <label htmlFor="" className="text-[#90A6B8] mb-2">
                Email address
              </label>
              <input
                type="email"
                name=""
                id=""
                className="border-[#90A6B8] border md:px-4 md:py-2"
                placeholder="E-mail address"
                onChange={(e)=>setEmail(e.target.value)}
                required
              />
            </div>
            <div className="flex md:flex-col mt-3">
              <label htmlFor="" className="text-[#90A6B8] mb-2">
                Password
              </label>
              <input
                type="password"
                name=""
                id=""
                className="border-[#90A6B8] border md:px-4 md:py-2"
                placeholder="Password"
                required
                onChange={(e)=>setPassword(e.target.value)}
              />
            </div>
            <div className="flex md:flex-col mt-3">
              <label htmlFor="" className="text-[#90A6B8] mb-2">
              Confirm  Password
              </label>
              <input
                type="password"
                name=""
                id=""
                className="border-[#90A6B8] border md:px-4 md:py-2"
                placeholder="Password"
                required
                onChange={(e)=>setConfirmPassword(e.target.value)}
              />
            </div>
             <div className="flex md:justify-center md:mt-4">
              {" "}
              <button className="bg-[#E5EBEE] md:px-20 md:py-2 text-[#7BA2CA]">SignUp to FinTrack</button>
            </div>
                    </form>

                </div>
            </div>
            
            
        </section>
    )
}

export default SignUp
