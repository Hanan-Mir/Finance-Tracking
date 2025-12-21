import { supabase } from "../../../supabaseClient";

export async function dashboardLoader() {
  //get all the transactions
  let { data: transactions_data, error: transactionsError } = await supabase
    .from("transactions_table")
    .select("*");

  //get the sales data from the transactions table
  let { data: sales_data, error: salesError } = await supabase
    .from("transactions_table")
    .select("*")
    .ilike("transaction_type", "sale");
  //get the sale balance from the transaction table
  let { data: sales_balance, error: salesbalanceError } = await supabase
    .from("transactions_table")
    .select("balance")
    .ilike("transaction_type", "sale");
  const totalSalesBalanceSum = sales_balance.reduce(
    (acc, curEl) => acc + curEl.balance,
    0
  );
  console.log(totalSalesBalanceSum);
  //get the expenses data from the transaction table
  let { data: expenses_data, error: expensesError } = await supabase
    .from("transactions_table")
    .select("*")
    .ilike("transaction_type", "expense");
  //calculate the total sum of the sales
  const totalSales = sales_data.reduce((acc, item) => acc + item.payment, 0);
  //calculate the total sum of the expenses
  const totalExpenses = expenses_data.reduce(
    (acc, item) => acc + item.payment,
    0
  );
  //calculate the total revenue
  const totalRevenue = totalSales - totalExpenses;
  //calculate the average sale value
  const averageSaleValue = Math.floor(totalSales / sales_data.length);
  //calculate the transaction count
  const transactionCount = sales_data.length + expenses_data.length;
  //calculate the growth percentage
  const curDate = new Date();
  const curMonthSales = sales_data
    .filter((item) => {
      const transactionDate = new Date(item.created_at);
      return curDate.getMonth() === transactionDate.getMonth();
    })
    .reduce((acc, curEl) => acc + curEl.payment, 0);
  const prevMonthSales = sales_data
    .filter((item) => {
      const transactionDate = new Date(item.created_at);
      return curDate.getMonth() - 1 === transactionDate.getMonth();
    })
    .reduce((acc, curEl) => acc + curEl.payment, 0);
  let calcGrowthPercentage =
    Math.floor((curMonthSales - prevMonthSales) / prevMonthSales) * 100;
  let growthPercentage =
    calcGrowthPercentage == "Infinity" ? "100" : calcGrowthPercentage;
  //calculate most recent transactions
  const recentTransactions = [...transactions_data]
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 2);
 //calculate the weekly sales 
 const weekDays=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
 //calculate current week sales
 const startOfWeek=new Date(curDate);
 startOfWeek.setDate(curDate.getDate()-curDate.getDay());
 startOfWeek.setHours(0,0,0,0);
const endOfWeek=new Date(startOfWeek)
endOfWeek.setDate(startOfWeek.getDate()+6)
endOfWeek.setHours(23,59,59,999)
const currentWeekSales={
    Sun:0,
    Mon:0,
    Tue:0,
    Wed:0,
    Thu:0,
    Fri:0,
    Sat:0,
}
sales_data.forEach((item)=>{
    const transactionDate=new Date(item.created_at);
    if(transactionDate>=startOfWeek && transactionDate<=endOfWeek){
        const dayName=weekDays[transactionDate.getDay()]
        currentWeekSales[dayName]+=Number(item.payment)
    }
})
//calculate previous week sales
const prevWeekSales={
    Sun:0,
    Mon:0,
    Tue:0,
    Wed:0,
    Thu:0,
    Fri:0,
    Sat:0,
}
const prevWeek=new Date(curDate)
prevWeek.setDate(curDate.getDate()-curDate.getDay()-7)
prevWeek.setHours(0,0,0,0)
sales_data.forEach((item)=>{
    const transactionDate=new Date(item.created_at);
    if(transactionDate>=prevWeek && transactionDate<startOfWeek){
        const dayName=weekDays[transactionDate.getDay()]
        prevWeekSales[dayName]+=Number(item.payment)
    }
})
const data=weekDays.map((item)=>(
    
       { name:item,
        current:currentWeekSales[item],
        previous:prevWeekSales[item]
       }

    
))


  return {
    totalRevenue,
    averageSaleValue,
    transactionCount,
    curMonthSales,
    growthPercentage,
    recentTransactions,
    totalSales,
    totalExpenses,
    totalSalesBalanceSum,
    data
  };
}
