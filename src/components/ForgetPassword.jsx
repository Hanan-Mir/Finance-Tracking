function ForgetPassword() {
    return (
        <section id="forget-password">
         <a href="/">   <img src="/images/logo.png" alt="" className="w-40" /> </a>
            <div className="main-section text-[#324F65] shadow-box md:px-8 md:py-5">
                
                <div className="heading flex md:flex-col md:items-center">
                    <h1 className="text-2xl"><span className="font-bold">Forgot </span>your password?</h1>
                    <p>Please enter your email bellow and we will email you with instructions on how to reset your password.</p>
                </div>
                <form action="" method="post">
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
             <div className="flex md:justify-center md:mt-4">
              {" "}
              <button className="bg-[#E5EBEE] md:px-20 md:py-2 text-[#7BA2CA]">Reset password</button>
            </div>
                </form>
            </div>
            
        </section>
    )
}

export default ForgetPassword
