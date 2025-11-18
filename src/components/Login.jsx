import { Link, useNavigate } from "react-router-dom";
import SignUp from "./SignUp";

function Login() {
    const navigate=useNavigate();
    //function to navigate to signup form
    function handleOnClickSignup(){
        navigate('/signUp')
    }
  return (
    <section id="login">
        <a href="/">  <img src="/images/logo.png" alt="" className="w-40" /> </a>
      <div className="form-element shadow-box">
        <div className="heading">
          
          <h1 className="md:ml-10 text-4xl text-[#324C65]">
            <span className="font-bold">Login</span> to FinTrack
          </h1>
          <p className="text-[1.5rem] mt-4 text-[#60AADF]">
            Don't have an account ?
            <span onClick={()=>handleOnClickSignup()} className="text-[#1FEAAD] underline">
              Sign Up here
            </span>
          </p>
        </div>
        <div>
          <form action="">
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
              />
            </div>
            <div className="flex w-full md:justify-end">
              <Link to='/forget-password' className="text-[#83B2DC]">forgot password ?</Link>
            </div>
            <div className="flex md:justify-center md:mt-4">
              {" "}
              <button className="bg-[#E5EBEE] md:px-20 md:py-2 text-[#7BA2CA]">Login to FinTrack</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Login;
