import { supabase } from "../../../supabaseClient";

async function salesLoader() {
  //Get the whole transactions data
  let { data: transactionsData, error } = await supabase
    .from("transactions_table")
    .select("*")
    .ilike("transaction_type", "sale");
  //get the current date
  const date = new Date();
  //get the current monthly sales
  const curMonthSales = transactionsData
    ?.filter((transaction) => {
      const transactionDate = new Date(transaction.created_at);

      return transactionDate.getMonth() === date.getMonth();
    })
    .reduce((acc, curEl) => acc + curEl.payment, 0);
  //previous month sales done
  const prevMonthSales = transactionsData
    ?.filter((transaction) => {
      const transactionDate = new Date(transaction.created_at);
      return transactionDate.getMonth() === date.getMonth() - 1;
    })
    .reduce((acc, curEl) => acc + curEl.payment, 0);
  //get the current monthly sales balance
  const curMonthlySalesBalance = transactionsData
    .filter((transaction) => {
      const transactionDate = new Date(transaction.created_at);

      return transactionDate.getMonth() === date.getMonth();
    })
    .reduce((acc, curEl) => acc + curEl.balance, 0);
  //previous month sales balance
  const prevMonthSalesBalance = transactionsData
    .filter((transaction) => {
      const transactionDate = new Date(transaction.created_at);

      return transactionDate.getMonth() === date.getMonth() - 1;
    })
    .reduce((acc, curEl) => acc + curEl.balance, 0);
  //get the weekly data related to the sales
  //----get the start of th week
  const startOfWeek = new Date(date);
  startOfWeek.setDate(date.getDate() - date.getDay());
  startOfWeek.setHours(0, 0, 0, 0);
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999);
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const totalWeekdaysales = {
    Sun: 0,
    Mon: 0,
    Tue: 0,
    Wed: 0,
    Thu: 0,
    Fri: 0,
    Sat: 0,
  };
  transactionsData.forEach((transaction) => {
    const curTransactionDate = new Date(transaction.created_at);
    if (curTransactionDate >= startOfWeek && curTransactionDate <= endOfWeek) {
      const dayName = weekDays[curTransactionDate.getDay()];
      totalWeekdaysales[dayName] += Number(transaction.payment);
    }
  });
  const weeklySalesData = weekDays.map((day) => ({
    name: day,
    uv: totalWeekdaysales[day],
  }));
  //get the monthly data related to the sales
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const currentYear = date.getFullYear();
  //initialize the months with the zero as initial sales done in a year
  const monthlyTotals = months.reduce((acc, m) => ({ ...acc, [m]: 0 }), {});
  transactionsData.forEach((transaction) => {
    const transactionDate = new Date(transaction.created_at);
    if (transactionDate.getFullYear() === currentYear) {
      const monthName = months[transactionDate.getMonth()];
      monthlyTotals[monthName] += Number(transaction.payment || 0);
    }
  });

  const monthlySalesData = months.map((item) => ({
    name: item,
    sale: monthlyTotals[item],
  }));
  //Get the recent two sales transactions
  const recentSalesTransaction = [...transactionsData]
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 2);

  return {
    curMonthSales,
    curMonthlySalesBalance,
    prevMonthSales,
    prevMonthSalesBalance,
    weeklySalesData,
    monthlySalesData,
    recentSalesTransaction
  };
}

export default salesLoader;
