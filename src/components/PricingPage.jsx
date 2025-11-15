import Footer from "./Cards/Footer"
import PrivacyCard from "./Cards/PrivacyCard"
import PricingSection from "./Sections/PricingSection"

function PricingPage() {
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
