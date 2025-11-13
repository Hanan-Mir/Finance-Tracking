const navLinks=[{
  id:'home',
  title:'Home'
},{
  id:'pricing',
  title:'Pricing'
},{
  id:'about',
  title:'About us'
},{
id:'login',
title:'Login'
}]
const featureLists = [
  {
    iconAddress: "/images/control.png",
    heading: "Have perfect control",
    body: "over all your cash expenses,bank accounts,E-Wallets and crypto wallets.",
  },
  {
    iconAddress: "/images/pie.png",
    heading: "Get a quick overview",
    body: "about your total incomes and expenses at a glance and in one place",
  },
  {
    iconAddress: "/images/budget.png",
    heading: "Use our smart Bugets",
    body: "to save money for a new car, dreamy vacation or top university",
  },
];
const firstStep = {
  stepNumber: "Step 1",
  stepHeading: "Track your cash flow",
  steps: [
    "Connect your bank accounts and all your transactions will get automatically imported to Fintrack.",
    "Get a complete overview of your cash flow.",
    "Add your cash expenses manually.",
  ],
};
const firstCard={
    name:'Account',
    type:'210188945',
    amount:'2311 USD'
}
const secondCard={
    name:'Saving Account',
    type:'Cash',
    amount:'5620 USD'
}
const thirdCard={
    name:'Family Wallet',
    type:'Cash',
    amount:'795 USD'
}


export { navLinks,featureLists, firstStep,firstCard,secondCard,thirdCard };
