import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function ForgetPassword() {
  const [email, setEmail] = useState();
  const { resetPasswordForEmail } = useAuth();
  const navigate = useNavigate();
  //function to send an reset password link to the registerd email in the supabase
  async function handleSubmit(e) {
    e.preventDefault();
    const result = await resetPasswordForEmail(email);
    console.log(result);
    if (result.success) {
      navigate("/passwordreset-message", {
        state: { fromForgetPassword: true },
      });
    }
  }

  return (
    <section id="forget-password">
      <a href="/">
        {" "}
        <img src="/images/logo.png" alt="" className="w-40" />{" "}
      </a>
      <div className="main-section text-[#324F65] shadow-box md:px-8 md:py-5">
        <div className="heading flex md:flex-col md:items-center">
          <h1 className="text-2xl">
            <span className="font-bold">Forgot </span>your password?
          </h1>
          <p>
            Please enter your email below and we will email you with
            instructions on how to reset your password.
          </p>
        </div>
        <form action="" method="post" onSubmit={(e) => handleSubmit(e)}>
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
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex md:justify-center md:mt-4">
            {" "}
            <button className="bg-[#E5EBEE] md:px-20 md:py-2 text-[#7BA2CA]  hover:cursor-pointer hover:bg-gray-500 hover:text-white transition-all duration-100 ease-in-out">
              Reset password
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default ForgetPassword;
