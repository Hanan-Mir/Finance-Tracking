import {  featureLists, firstCard, firstStep, secondCard, thirdCard } from "../../constants";
import AccountCard from "./Cards/AccountCard";
import FeaturesCard from "./Cards/FeaturesCard";
import ManageSteps from "./Cards/ManageSteps";

function LandingPage() {
  return (
    <section id="Hero">
      <div className="body">
        <div className="left-section">
          <h1 className="hero-heading">
            The only platform that <span> gets your money into shape</span>
          </h1>
          <h2>Manage business on the go with FinTrack.</h2>
        </div>
        <div className="right-section">
          <img src="/images/Hero.jpg" alt="" />
        </div>
      </div>
      <div className='feature-card'>
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
           <span> How to get your </span> <span>money into shape?</span>
          </h1>
        
      </div>
     
      <div className="steps" >
        <div className="md:w-[50%]" >
          <ManageSteps
            stepNumber={firstStep.stepNumber}
            stepHeading={firstStep.stepHeading}
            steps={firstStep.steps}
          />
         
        </div>
       
       
        <div className="md:w-[50%] flex md:flex-col md:items-end ">
          <AccountCard name={firstCard.name} type={firstCard.type} amount={firstCard.amount} translateAmount='0' zindex='0' />
          
          <AccountCard name={secondCard.name} type={secondCard.type} amount={secondCard.amount} translateAmount='20' zindex='2' />
         
          <AccountCard name={thirdCard.name} type={thirdCard.type} amount={thirdCard.amount} translateAmount='40' zindex='3'/>
          
        </div>
      </div>
    </section>
  );
}

export default LandingPage;
