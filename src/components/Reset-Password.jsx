import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const [password, setPassword] = useState();
  const { updatePassword, setPasswordRestSession } = useAuth();
  const navigate = useNavigate();

  //user will submit the password and it will be updated in the supabase on sucess
  async function handleSubmit(e) {
    e.preventDefault();
    const result = await updatePassword(password);
    localStorage.removeItem("isPasswordRecoverySession");
    setPassword();
    if (result.success) {
      toast.success("Password reset sucessfully!", {
        position: "top-center",
        autoClose: 4000,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setTimeout(() => navigate("/login"), 4500);
    }
    setPasswordRestSession(false);
  }
  return (
    <section id="forget-password">
      <ToastContainer />
      <a href="/">
        {" "}
        <img src="/images/logo.png" alt="" className="w-40" />{" "}
      </a>
      <div className="main-section text-[#324F65] shadow-box md:px-8 md:py-5">
        <div className="heading flex md:flex-col md:items-center">
          <h1 className="text-2xl">
            <span className="font-bold">Forgot </span>your password?
          </h1>
          <p>Please enter your new passoword.</p>
        </div>
        <form action="" method="post" onSubmit={(e) => handleSubmit(e)}>
          <div className="flex md:flex-col mt-3">
            <label htmlFor="" className="text-[#90A6B8] mb-2">
              New Password
            </label>
            <input
              type="password"
              name=""
              id=""
              className="border-[#90A6B8] border md:px-4 md:py-2"
              placeholder="New Password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex md:justify-center md:mt-4">
            {" "}
            <button className="bg-[#E5EBEE] md:px-20 md:py-2 text-[#7BA2CA]">
              Reset password
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
