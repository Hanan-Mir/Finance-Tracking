function FeaturesCard({iconAddress,heading,body}) {
    return (
        
            <div className="w-[30%] h-[38%] relative flex flex-col justify-start  px-6 shadow-xl rounded-md ">
                <img src={`${iconAddress}`} alt="" className="w-[24%] h-[26%] absolute -left-8 -top-6" />
                <div className="w-full absolute top-15 ">
                <h1 className="text-[1.8rem] font-bold text-nowrap">{heading}</h1>
                <p className="w-[84%] leading-loose font-montserrat text-[#344554] text-[1.2rem]">{body}.</p>
                </div>
            </div>
            
       
    )
}

export default FeaturesCard
