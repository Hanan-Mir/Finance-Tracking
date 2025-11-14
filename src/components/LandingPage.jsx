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
        <div className="md:w-[50%]">
          <ManageSteps
            stepNumber={firstStep.stepNumber}
            stepHeading={firstStep.stepHeading}
            steps={firstStep.steps}
          />
        </div>

        <div className="md:w-[50%] flex md:flex-col md:items-end md:mt-[30%]  ">
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
      <div>

      </div>
      <div className="estimates">
         <div className="md:w-[40%] relative">
          <ManageSteps
            stepNumber={thirdStep.stepNumber}
            stepHeading={thirdStep.stepHeading}
            steps={thirdStep.steps}
          />
        </div>
        <SpendingsCard value='31%' />

      </div>
      <div className="features">
        <div>
        <h1><span>Features</span> our users love</h1>
        </div>
        <div className="flex md:justify-between md:gap-30">
          {highlightFeatures.map((el)=>(
              <Highlights imgPath={el.imgPath} heading={el.heading} description={el.description} />

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
