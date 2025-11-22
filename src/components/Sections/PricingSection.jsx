import { useGSAP } from "@gsap/react";
import { pricingInfo } from "../../../constants";
import FeatureLists from "../Cards/FeatureLists";
import PricingCard from "../Cards/PricingCard";
import gsap from "gsap";
import { useState } from "react";

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
  const [translateposition,setTranslatePosition]=useState('translate-x-[0%]');
  const [selectedPlan,setSelectedPlan]=useState('monthly')
  function handlePricingPlan(curPlan){
  if(curPlan==='monthly'){
     setTranslatePosition('translate-x-[0%]');
     setSelectedPlan(curPlan)
  }
  if(curPlan==='yearly'){
    setSelectedPlan(curPlan)
     setTranslatePosition('translate-x-[100%]')
}
  }

  return (
    <div className="w-full h-full flex md:flex-col md:items-center md:mt-20">
      <div className=" w-[30%] flex md:justify-center">
        <div className="relative border border-[#12C48B] md:w-[90%] md:h-[7vh] rounded-full flex md:justify-between md:items-center md:gap-5">
          <span onClick={()=>handlePricingPlan('monthly')} className={`${selectedPlan==='monthly'?'text-white':'text-[#12C48B]' } flex md:items-center text-center h-full z-20 md:px-5 hover:cursor-pointer `}>Monthly plan</span>
          <span onClick={()=>handlePricingPlan('yearly')} className={`${selectedPlan==='yearly'?'text-white':'text-[#12C48B]' }  z-10 h-full flex md:items-center grow text-center md:px-10 yearly-plan hover:cursor-pointer `}>Yearly plan</span>
          <div className={`md:absolute md:w-[50%] md:h-full bg-[#12C48B] rounded-full ${translateposition}`}></div>
        </div>
      </div>
      <div className="w-full h-full mt-20 flex z-30 gap-10">
        <FeatureLists />
        {pricingInfo.map((price) => {
          return <PricingCard plan={price} selectedPlan={selectedPlan} />;
        })}
      </div>
    </div>
  );
}

export default PricingSection;
