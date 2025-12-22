import { Link, useNavigate } from "react-router-dom";
import SignUp from "./SignUp";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const { session, signIn, signInWithGoogle } = useAuth();

  //function to sign in with google
  async function handleGoogleSignIn() {
    await signInWithGoogle();
  }
  //function to sign in with email and password
  async function handleSignIn(e) {
    try {
      e.preventDefault();
      const result = await signIn({ email, password });

      if (result.success) {
        navigate("/dashboard");
      }
      if (!result.success) {
        if (result.error.type === "confirm Mail error") {
          toast.error(`Email not confirmed`, {
            position: "top-center",
            autoClose: 4000,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }
        if (result.error.type === "Invalid login credentials") {
          toast.error(`Invalid login credentials`, {
            position: "top-center",
            autoClose: 4000,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <section id="login">
      <ToastContainer />
      <Link to="/">
        {" "}
        <img src="/images/logo.png" alt="" className="w-40" />{" "}
      </Link>
      <div className="form-element shadow-box">
        <div className="heading">
          <h1 className="md:ml-10 text-4xl text-[#324C65]">
            <span className="font-bold">Login</span> to FinTrack
          </h1>
          <p className="text-[1.5rem] mt-4 text-[#60AADF]">
            Don't have an account ?
            <Link to="/signUp" className="text-[#1FEAAD] underline">
              Sign Up here
            </Link>
          </p>
        </div>
        <div>
          <form action="" onSubmit={handleSignIn}>
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
                onChange={(e) => setEmail(e.target.value)}
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
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex w-full md:justify-end">
              <Link to="/forget-password" className="text-[#83B2DC]">
                forgot password ?
              </Link>
            </div>
            <div className="flex md:justify-center md:mt-4">
              {" "}
              <button className="bg-[#E5EBEE] md:px-20 md:py-2 text-[#7BA2CA] hover:cursor-pointer hover:bg-gray-500 hover:text-white transition-all duration-100 ease-in-out">
                Login to FinTrack
              </button>
            </div>
          </form>
          <div className="flex md:justify-center md:mt-4">
            {" "}
            <button
              onClick={handleGoogleSignIn}
              className="flex gap-2  md:items-center bg-black font-bold transition-all duration-300 ease-in-out md:px-10 md:py-2 text-white hover:cursor-pointer hover:bg-white hover:border hover:shadow-box hover:text-black"
            >
              <img src="/images/google.png" alt="" className="w-5" />
              <span>Continue with Google</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
