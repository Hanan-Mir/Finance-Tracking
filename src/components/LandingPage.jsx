import { useGSAP } from "@gsap/react";
import {
  featureLists,
  firstCard,
  firstStep,
  highlightFeatures,
  secondCard,
  secondStep,
  thirdCard,
  thirdStep,
} from "../../constants";
import AccountCard from "./Cards/AccountCard";
import FeaturesCard from "./Cards/FeaturesCard";
import Footer from "./Cards/Footer";
import Highlights from "./Cards/Highlights";
import ManageSteps from "./Cards/ManageSteps";
import SpendingsCard from "./Cards/SpendingsCard";
import AccountBalanceGraph from "./Graphs/AccountBalanceGraph";
import gsap, { SplitText } from "gsap/all";

function LandingPage() {
  useGSAP(() => {
    const paragraphSplit = new SplitText(".hero-heading", { type: "lines" });
    const managmentSectionSplit=new SplitText('.managment h1',{type:'lines'});
    gsap.from(paragraphSplit.lines, {
      opacity: 0,
      xPercent: -100,
      duration: 1.5,
      ease: "expo.out",
    });
    gsap.from(".sub-heading", {
      opacity: 0,
      xPercent: -100,
      duration: 1.5,
      ease: "expo.out",
      delay: 0.2,
    });
    gsap.from(".right-section img", {
      opacity: 0,
      xPercent: 100,
      duration: 1.5,
      ease: "expo.out",
      delay: 0.1,
    });
    gsap.from(managmentSectionSplit.lines,{
      opacity:0,
      yPercent:70,
      duration:1.5,
      delay:0.2,
      ease:'expo.out',
      scrollTrigger:{
        trigger:'.managment',
        start:'top 50%',
        scrub:false
      }
    })
    gsap.from('.feature-card .features-card', {
      yPercent: 50,
      opacity: 0,
      duration: 1, 
      ease: 'power1.out',
      stagger: 0.2, 
      scrollTrigger: {
        trigger: '.feature-card', 
        start: 'top 80%',
      
        scrub: false,
      }
    });
    gsap.from('.steps-container > .steps-card p',{
      yPercent:50,
      opacity:0,
      duration:1,
      ease:'power1.inOut',
      scrollTrigger:{
        trigger:'.feature-card',
        start:'bottom 40%'
      }
    
    })
    gsap.from('.steps-container > .steps-card h1',{
      yPercent:50,
      opacity:0,
      duration:1,
      ease:'power1.inOut',
      scrollTrigger:{
        trigger:'.feature-card',
        start:'bottom 50%'
      }
    
    })
    gsap.from('.steps-container > .steps-card ul',{
      yPercent:50,
      opacity:0,
      duration:1,
      stagger:0.2,
      ease:'power1.inOut',
      scrollTrigger:{
        trigger:'.steps-container',
        start:'top 90%'
      }
    
    })
    gsap.from('.card-section .account-card:nth-of-type(1)',{
      translateY:'50%',
   
      duration:2,
      ease:'power2.inOut',
      scrollTrigger:{
        trigger:'.steps',
        start:'top 40%'
      }
  
    })
     gsap.from('.card-section .account-card:nth-of-type(3)',{
      translateY:'-60%',
      
      duration:2,
      ease:'power2.inOut',
      scrollTrigger:{
        trigger:'.steps',
        start:'top 40%'
      }
  
    })
    
    gsap.from('.financial-habits .steps-card p',{
      yPercent:50,
      opacity:0,
      duration:1,
      ease:'power1.inOut',
      scrollTrigger:{
        trigger:'.financial-habits',
        start:'top 40%'
      }
    
    })
    gsap.from('.financial-habits .steps-card h1',{
      yPercent:50,
      opacity:0,
      duration:1,
      ease:'power1.inOut',
      scrollTrigger:{
        trigger:'.financial-habits',
        start:'top 50%'
      }
    
    })
    gsap.from('.financial-habits .steps-card ul',{
      yPercent:50,
      opacity:0,
      duration:1,
      stagger:0.2,
      ease:'power1.inOut',
      scrollTrigger:{
        trigger:'.financial-habits',
        start:'top 70%'
      }
    
    })
    gsap.from('.estimates .steps-card p',{
      yPercent:50,
      opacity:0,
      duration:1,
      ease:'power1.inOut',
      scrollTrigger:{
        trigger:'.estimates',
        start:'top 40%'
      }
    
    })
    gsap.from('.estimates .steps-card h1',{
      yPercent:50,
      opacity:0,
      duration:1,
      ease:'power1.inOut',
      scrollTrigger:{
        trigger:'.estimates',
        start:'top 50%'
      }
    
    })
    gsap.from('.estimates .steps-card ul',{
      yPercent:50,
      opacity:0,
      duration:1,
      stagger:0.2,
      ease:'power1.inOut',
      scrollTrigger:{
        trigger:'.estimates',
        start:'top 70%'
      }
    
    })
    gsap.from('.features h1:first-of-type',{
      yPercent:100,
      opacity:0,
      duration:1.2,
      ease:'power1.inOut',
      scrollTrigger:{
        trigger:'.features',
        start:'top 80%'
      }
    })
     gsap.from('.highlights',{
            yPercent:50,
            opacity:0,
            duration:1,
            stagger:0.5,
            ease:'power2.inOut',
            scrollTrigger:{
                trigger:'.features',
                start:'top 90%',
              
            }
        })
    
    
  }, []);

  return (
    <section id="Hero">
      <div className="body">
        <div className="left-section">
          <h1 className="hero-heading">
            The only platform that <span> gets your money into shape</span>
          </h1>
          <h2 className="sub-heading">
            Manage business on the go with FinTrack.
          </h2>
        </div>
        <div className="right-section">
          <img src="/images/Hero.jpg" alt="" />
        </div>
      </div>
      <div className="feature-card">
        {featureLists.map((el) => (
          <FeaturesCard
            iconAddress={el.iconAddress}
            heading={el.heading}
            body={el.body}
          />
        ))}
      </div>
      <div className="managment">
        <h1>
          <span className="block"> How to get your </span>{" "}
          <span className="block">money into shape?</span>
        </h1>
      </div>

      <div className="steps">
        <div className="md:w-[50%] steps-container">
          <ManageSteps
            stepNumber={firstStep.stepNumber}
            stepHeading={firstStep.stepHeading}
            steps={firstStep.steps}
          />
        </div>

        <div className="card-section md:w-[50%] flex md:flex-col md:items-end md:mt-[30%]  ">
          <AccountCard
            name={firstCard.name}
            type={firstCard.type}
            amount={firstCard.amount}
            translateAmount="0"
            zindex="0"
          />

          <AccountCard
            name={secondCard.name}
            type={secondCard.type}
            amount={secondCard.amount}
            translateAmount="20"
            zindex="2"
          />

          <AccountCard
            name={thirdCard.name}
            type={thirdCard.type}
            amount={thirdCard.amount}
            translateAmount="40"
            zindex="3"
          />
        </div>
      </div>
      <div className="financial-habits">
        <AccountBalanceGraph />

        <div className="md:w-[40%] relative">
          <ManageSteps
            stepNumber={secondStep.stepNumber}
            stepHeading={secondStep.stepHeading}
            steps={secondStep.steps}
          />
        </div>
      </div>
      <div></div>
      <div className="estimates">
        <div className="md:w-[40%] relative">
          <ManageSteps
            stepNumber={thirdStep.stepNumber}
            stepHeading={thirdStep.stepHeading}
            steps={thirdStep.steps}
          />
        </div>
        <SpendingsCard value="31%" />
      </div>
      <div className="features">
        <div>
          <h1>
            <span>Features</span> our users love
          </h1>
        </div>
        <div className="flex md:justify-between md:gap-30">
          {highlightFeatures.map((el) => (
            <Highlights
              imgPath={el.imgPath}
              heading={el.heading}
              description={el.description}
            />
          ))}
        </div>
      </div>
      <div className="w-full absolute md:top-[550vh] flex md:justify-center">
        <Footer />
      </div>
    </section>
  );
}

export default LandingPage;
