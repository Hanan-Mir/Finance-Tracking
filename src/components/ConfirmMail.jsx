import { Navigate, useLocation } from "react-router-dom"

function ConfirmMail() {
    const location=useLocation();
     if(!location.state?.fromConfirmEmail){
        return <Navigate to='/login' replace />
    }
    return (
        <div className="w-full container mx-auto h-screen flex md:items-center md:justify-center text-[#545657]  ">
            <div className="flex w-[50vw] h-[34vh] bg-[#EEEDE8] md:flex-col md:justify-between items-center shadow-box py-4">
            <img src="/images/confirmMail.png" alt="" className="w-40" />
            <h1 className="text-3xl">Thank You!</h1>
            <h1 className="text-2xl font-semibold">A confirmation email has been sent to your mail.</h1>
        </div>
        </div>
    )
}

export default ConfirmMail
