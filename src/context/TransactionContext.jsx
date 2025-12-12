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
  //This useEffect will run whenever there is a transaction done
  useEffect(() => {
    getTotalSales();
    getTotalExpenses();
    getTotalCashTransaction();
    getTotalOnlineTransaction();
    getSalesBalance();
    getExpensesBalance();
  }, [getTotalSales, getTotalExpenses, getExpensesBalance]);

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
      }}
    >
      {children}
    </transactionContext.Provider>
  );
}
export function useTransactionContext() {
  return useContext(transactionContext);
}
