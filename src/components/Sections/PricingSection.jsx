import { useGSAP } from "@gsap/react";
import { pricingInfo } from "../../../constants";
import FeatureLists from "../Cards/FeatureLists";
import PricingCard from "../Cards/PricingCard";
import gsap from "gsap";

function PricingSection() {
    useGSAP(() => {
    gsap.from(".plan-info", {
      opacity: 0,
      xPercent: 100,
      duration: 0.5,
      ease: "power1.inOut",
      stagger: 0.4,
    });
  }, []);

  return (
    <div className="w-full h-full flex md:flex-col md:items-center md:mt-20">
      <div className=" w-[30%] flex md:justify-center">
        <div className="relative border border-[#12C48B] md:w-[90%] md:h-[7vh] md:px-0 md:py-5 rounded-full flex md:justify-between md:items-center md:gap-5">
          <span className="text-white z-20 md:px-5">Monthly plan</span>
          <span className="text-[#12C48B] z-10 md:px-10">Yearly plan</span>
          <div className="md:absolute md:w-[50%] md:h-[7vh] bg-[#12C48B] rounded-full translate-x-[0%]"></div>
        </div>
      </div>
      <div className="w-full h-full mt-20 flex z-30 gap-10">
           <FeatureLists />
        {pricingInfo.map((price)=>{
             return <PricingCard plan={price} />

        })}
     
        
        
        
      </div>
    </div>
  );
}

export default PricingSection;
