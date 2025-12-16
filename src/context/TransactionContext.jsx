import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { supabase } from "../../supabaseClient";
import { addArray, addBalance } from "../Helper-Functions/utilityFunctions";

const transactionContext = createContext();
export default function TransactionContextProvider({ children }) {
  const [salesValue, setSalesValue] = useState();
  const [expensesValue, setExpensesValue] = useState();
  const [cashTransactions, setCashTransactions] = useState();
  const [onlineTransactions, setOnlineTransactions] = useState();
  const [cashSales, setCashSales] = useState();
  const [expenseBalance, setExpenseBalance] = useState();
  const [salesCompare,setSalesCompare]=useState();
  const [expensesCompare,setExpensesCompare]=useState();
  //function to get the total sales from the supabase
  const getTotalSales = useCallback(async () => {
    let { data: sales, error } = await supabase
      .from("transactions_table")
      .select("payment")
      .ilike("transaction_type", "sale");

    const totalSales = addArray(sales);
    totalSales ? setSalesValue(totalSales) : setSalesValue(0);
  }, []);
  //get the total expenses
  const getTotalExpenses = useCallback(async () => {
    let { data: expenses, error } = await supabase
      .from("transactions_table")
      .select("payment")
      .ilike("transaction_type", "expense");

    const totalExpense = addArray(expenses);
    totalExpense !== 0 ? setExpensesValue(totalExpense) : setExpensesValue(0);
  }, []);

  //function to get the total cash transaction
  async function getTotalCashTransaction() {
    let { data: cashTransaction, error } = await supabase
      .from("transactions_table")
      .select("payment")
      .ilike("payment_mode", "cash");
    const cashSum = cashTransaction.reduce((acc, el) => {
      return acc + el.payment;
    }, 0);
    cashSum !== 0 ? setCashTransactions(cashSum) : setCashTransactions(0);
  }
  //function to get online transactions
  async function getTotalOnlineTransaction() {
    let { data: onlineSum, error } = await supabase
      .from("transactions_table")
      .select("payment")
      .ilike("payment_mode", "online");
    const sum = addArray(onlineSum);
    onlineSum !== 0 ? setOnlineTransactions(sum) : setOnlineTransactions(0);
  }
  //function to get total outflow of cashinflow
  async function getSalesBalance() {
    let { data: cashInflow, error } = await supabase
      .from("transactions_table")
      .select("balance")
      .ilike("transaction_type", "sale");
    console.log(cashInflow);
    const sum = addBalance(cashInflow);
    console.log(sum);
    cashInflow !== 0 ? setCashSales(sum) : setCashSales(0);
  }
  //function to get expenses balance
  const getExpensesBalance = useCallback(async () => {
    let { data: expensesBalance, error } = await supabase
      .from("transactions_table")
      .select("balance")
      .ilike("transaction_type", "expense");
    const sum = addBalance(expensesBalance);
    console.log(sum);
    expenseBalance !== 0 ? setExpenseBalance(sum) : setExpenseBalance(0);
  }, [expenseBalance]);
  
  //function to compare the current month sales with the previous month sales
  const compareSalesMonthly=useCallback(async()=>{
 //get all the transactions from the supabase

let { data: transactions, error } = await supabase
  .from('transactions_table')
  .select('*').ilike('transaction_type',`sale`);
  //current date of the month
  const now=new Date();
  const currentMonth=now.getMonth();
  const currentYear=now.getFullYear();
  //previous month of the trnasnaction
  const previousDate=new Date();
  previousDate.setMonth(now.getMonth()-1);
  const previousMonth=previousDate.getMonth();
  const previousYear=previousDate.getFullYear();
  const currentTotal=transactions.filter((transaction=>{
    const transactionDate=new Date(transaction.created_at);
    return transactionDate.getMonth()===currentMonth && transactionDate.getFullYear()===currentYear
  })).reduce((sum,el)=>sum+el.payment,0);
  const previousTotal=transactions.filter((transaction=>{
    const transactionDate=new Date(transaction.created_at);
    return transactionDate.getMonth()===previousMonth && transactionDate.getFullYear()===previousYear
  })).reduce((sum,el)=>sum+el.payment,0);
  //handling the situation when there are no previous month transactions
  if(previousTotal===0){
    setSalesCompare(100)
    return
  }
let percentage=((currentTotal-previousTotal)/previousTotal)*100
console.log(percentage)
setSalesCompare(percentage)


  },[])
  //function to compare the current month expenses with the previous month sales
  const compareExpensesMonthly=useCallback(async()=>{
 //get all the transactions from the supabase

let { data: transactions, error } = await supabase
  .from('transactions_table')
  .select('*').ilike('transaction_type',`expense`);
  //current date of the month
  const now=new Date();
  const currentMonth=now.getMonth();
  const currentYear=now.getFullYear();
  //previous month of the trnasnaction
  const previousDate=new Date();
  previousDate.setMonth(now.getMonth()-1);
  const previousMonth=previousDate.getMonth();
  const previousYear=previousDate.getFullYear();
  const currentTotal=transactions.filter((transaction=>{
    const transactionDate=new Date(transaction.created_at);
    return transactionDate.getMonth()===currentMonth && transactionDate.getFullYear()===currentYear
  })).reduce((sum,el)=>sum+el.payment,0);
  const previousTotal=transactions.filter((transaction=>{
    const transactionDate=new Date(transaction.created_at);
    return transactionDate.getMonth()===previousMonth && transactionDate.getFullYear()===previousYear
  })).reduce((sum,el)=>sum+el.payment,0);
  //handling the situation when there are no previous month transactions
  if(previousTotal===0){
    setExpensesCompare(100)
    return
  }
let percentage=((currentTotal-previousTotal)/previousTotal)*100

setExpensesCompare(percentage)


  },[])
  //This useEffect will run whenever there is a transaction done
  useEffect(() => {
    getTotalSales();
    getTotalExpenses();
    getTotalCashTransaction();
    getTotalOnlineTransaction();
    getSalesBalance();
    getExpensesBalance();
    compareSalesMonthly();
    compareExpensesMonthly();
  }, [getTotalSales, getTotalExpenses, getExpensesBalance,compareSalesMonthly,compareExpensesMonthly]);

  return (
    <transactionContext.Provider
      value={{
        refetchSales: getTotalSales,
        salesValue,
        refetchExpenses: getTotalExpenses,
        expensesValue,
        refetchCashTransactions: getTotalCashTransaction,
        cashTransactions,
        onlineTransactions,
        cashSales,
        expenseBalance,
        refetchTotalOnlineTransactions:getTotalOnlineTransaction,
        refetchSalesBalance:getSalesBalance,
        refetchExpensesBalance:getExpensesBalance,
        salesCompare,
        compareSalesMonthly,
        compareExpensesMonthly,
        expensesCompare
      
      }}
    >
      {children}
    </transactionContext.Provider>
  );
}
export function useTransactionContext() {
  return useContext(transactionContext);
}
