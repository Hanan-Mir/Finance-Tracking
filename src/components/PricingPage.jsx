import { useGSAP } from "@gsap/react"
import Footer from "./Cards/Footer"
import PrivacyCard from "./Cards/PrivacyCard"
import PricingSection from "./Sections/PricingSection"
import { enableKeyboardScrollSupport } from "../../HelperFunctions/gsapAnimations"
import gsap from "gsap"
import { SplitText } from "gsap/SplitText"

function PricingPage() {
    useGSAP(()=>{
        gsap.registerPlugin(SplitText);
        const headingSplit=new SplitText('.heading-content > h1',{type:'words'});

        const cleanup=enableKeyboardScrollSupport();
        
        const bgImgTimeline=gsap.timeline({
            scrollTrigger:{
                trigger:'#pricing',
                start:'top top',
                end:'bottom top',
                scrub:true
            }
        })
        
        bgImgTimeline.to('.left-img',{y:250},0)
        bgImgTimeline.to('.right-img',{y:-250},0)
        gsap.from(headingSplit.words,{
            opacity:0,
            yPercent:50,
            duration:1.5,
            ease:'expo.out',
            stagger:0.2
        })
        gsap.from('.plan-section > h1',{
            opacity:0,
            yPercent:100,
            duration:2,
            ease:'expo.out'
        })
          gsap.from('.left-img',{
            opacity:0,
            xPercent:-50,
            duration:1.5,
            ease:'expo.out',
            
        })
        gsap.from('.right-img',{
            opacity:0,
            xPercent:50,
            duration:1.5,
            ease:'expo.out',
            
        })
        gsap.from(".privacy-card", {
      opacity: 0,
      yPercent: -100,
      duration: 0.5,
      ease: "power1.inOut",
      scrollTrigger:{
        trigger:'.privacy-card',
        start:'top 90%'
        
      }})
        return cleanup
    },[])
    return (
       <section id="pricing">
        <div className="info-section">
            <img src="/images/bg-left.svg" alt="" className="left-img" />
            <div className="heading-content">
                <h1>
                    <span>Get the access to</span>
                    <span>all money saving features</span>
                </h1>
                <div className="plan-section">
                    <h1>Choose your plan</h1>
                    <PricingSection />

                </div>

            </div>
            <img src="/images/bg-right.svg" alt="" className='right-img' />
        </div>
        <div className="privacy w-full ">
            
            <img src="/images/bg-right.svg" alt="" className="absolute rotate-150 md:top-[175vh] md:left-[-20vh]" />
          
                <PrivacyCard />
            </div>

       <div className="w-full absolute md:top-[290vh] flex md:justify-center">
        <Footer />

      </div>
      


       </section>
    )
}

export default PricingPage
