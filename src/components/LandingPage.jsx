import FeaturesCard from "./Cards/FeaturesCard";

function LandingPage() {
  return (
    <section id="Hero">
      <div>
        <div>
          <h1>
            The only platform that <span> gets your money into shape</span>
          </h1>
          <h2>Manage business on the go with FinTrack.</h2>
        </div>
        <div>
          <img src="/images/Hero.jpg" alt="" />
        </div>
      </div>
      <div className="md:absolute md:top-full md:w-full">
        <FeaturesCard
          iconAddress="/images/control.png"
          heading="Have perfect control"
          body='over all your cash expenses,bank accounts,E-Wallets and crypto wallets.'

        />
        <FeaturesCard
          iconAddress="/images/pie.png"
          heading="Get a quick overview"
          body='about your total incomes and expenses at a glance and in one place.'

        />
        <FeaturesCard
          iconAddress="/images/budget.png"
          heading="Use our smart Bugets"
          body='to save money for a new car, dreamy vacation or top university'

        />
      </div>
    </section>
  );
}

export default LandingPage;
