import { useGSAP } from "@gsap/react"
import Expenses from "./Expenses"
import gsap from "gsap/all"

function SpendingsCard() {
    useGSAP(()=>{

        gsap.from('.spending-card div:nth-of-type(1)',{
            translateX:'-20%',
            translateY:'-20%',
            duration:1,
            ease:'power1.inOut',
            scrollTrigger:{
                trigger:'.spending-card',
                start:'top 80%'
            }
        })

    },[])
    return (
        <div className=" spending-card w-[50%] md:h-[60vh] flex md:justify-end relative">
            <div className="w-[50%] h-full shadow-box flex md:justify-center md:items-start relative">
                <img src="/images/bag.png" alt="" className="w-15 md:absolute md:top-[-30px]" />

            </div>
            <div className="w-[60%] md:h-[88%] absolute top-20 right-10 flex md:flex-col md:justify-between ">
                <Expenses barColor='#ff5154;' value='31' heading='Power and energy' imgPath='/images/charging.png' amount='2,795 EUR' />
              
                 <Expenses barColor='#ffbf53' value='62' heading='Inventory' imgPath='images/inventory.png' amount='2,334 EUR' />
                
                
                     <Expenses barColor='#f963a0' value='50' heading='Salary' amount='10998 EUR' imgPath='images/salary.png' />
                

            </div>
            
        </div>
    )
}

export default SpendingsCard
