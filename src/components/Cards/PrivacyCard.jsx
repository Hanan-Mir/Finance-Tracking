function PrivacyCard() {
    return (
        <div className="w-full h-full absolute top-[200vh] left-[20vh]  ">
            <div className="w-[70%] h-[30vh] shadow-box bg-white flex md:items-center hover:shadow-hover transition-all duration-150">
                <img src="/images/sheildIcon.png"  alt="" className="w-40" />
                <div className="flex md:flex-col md:gap-5">
                    <h1 className="text-[#344554] w-[80%] text-4xl">Protecting your data's privacy is our top priority</h1>
                    <p className="text-[#344554]">Find out more about how approach security.</p>
                </div>
                <img src="/images/right.png" className="w-20" alt="" />
            </div>
           
        </div>
    )
}

export default PrivacyCard
