import { Navigate, useLocation } from "react-router-dom"

function PasswordResetMessage() {
    const location=useLocation();
    if(!location.state?.fromForgetPassword){
        return <Navigate to='/forget-password' replace />
    }
    return (
       <div className="w-full container mx-auto h-screen flex md:items-center md:justify-center text-[#545657]  ">
            <div className="flex w-[50vw] h-[34vh] bg-[#EEEDE8] md:flex-col md:justify-center items-center shadow-box py-4">
            <img src="/images/confirmMail.png" alt="" className="w-40" />
            
            <h1 className="text-2xl font-semibold">A password reset link has been sent to the email.</h1>
        </div>
        </div>
    )
}

export default PasswordResetMessage
