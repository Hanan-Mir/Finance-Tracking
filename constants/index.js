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
const secondStep = {
  stepNumber: "Step 2",
  stepHeading: "UnderStand your financial habits",
  steps: [
    "Analyze your finance with beautiful, simple and easy to understand graphic. No need for complicated Excel sheets.",
    "See where your money goes and where they come from every month.",
    "See whether you spend less than you earn in one place and on 1 tap.",
  ],
};
const thirdStep = {
  stepNumber: "Step 3",
  stepHeading: "Make your spending stress–fre",
  steps: [
    "Set smart budgets to help you not to overspend in chosen category.",
    "Know how much you can spend daily in order to stick to your budget.",
    "Save money for your future dreams.",
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
const highlightFeatures=[
  {
    imgPath:'/images/notification.png',
    heading:'Alerts and notifications',
    description:'will notify you regarding transactions to keep you upto date.'
  },
  {
    imgPath:'/images/customer.png',
    heading:'Customize FinTrack',
    description:'Customize your FinTrack according to your business and add expenses and incomes.'
  },{
    imgPath:'/images/Manage.png',
    heading:'Managability',
    description:'With FinTrack you can manage you business in one with makees you step ahead of competition.'
  }
]

export { navLinks,featureLists, firstStep,firstCard,secondCard,thirdCard,secondStep,thirdStep,highlightFeatures };
