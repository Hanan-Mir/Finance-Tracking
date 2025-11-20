import { useGSAP } from "@gsap/react";
import gsap from "gsap";

function PricingCard({ plan }) {
  const planArray = Array.from(plan.features);

  return (
    <div className=" md:w-[25%] md:h-full shadow-box md:px-5 md:py-4 relative bg-white plan-info">
      <img
        src={plan.imgPathIcon}
        className="w-15 absolute md:-top-8 left-30 rounded-full px-2 py-2 bg-white shadow-box"
        alt=""
      />
      <div className="flex md:flex-col md:items-center md:gap-4 ">
        <h2 className="md:mt-15 font-bold text-2xl text-[#344554]">
          {plan.heading}
        </h2>
        <p className="w-[75%] text-[#6C767F]">{plan.description}</p>
        <p className="font-bold text-2xl text-[#344554]">{plan.price}</p>
      </div>
      <div className="w-full flex md:flex-col md:items-center md:gap-5 mt-5">
        {planArray.map(([_, value]) =>
          !value ? (
            <img src="/images/cross.png" alt="" className="w-10" />
          ) : value === "unlimted" || value === "1" ? (
            <p className="text-[#12C48B] font-semibold">{value}</p>
          ) : (
            <img src="/images/present.png" alt="" className="w-10" />
          )
        )}
      </div>
    </div>
  );
}

export default PricingCard;
