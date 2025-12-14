import { Button, ButtonGroup } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import {
  Form,
  useActionData,
  useNavigation,
  useSubmit,
} from "react-router-dom";
import {
  getCurrentStock,
  getProducts,
  searchVendors,
} from "../../Business-Logic/Transactions/supabaseActions";
import { useTransactionContext } from "../../context/TransactionContext";

function TransactionForm({ formStatus }) {
  const [transactionType, setTransactionType] = useState("sale");
  const [vendorName, setVendorName] = useState();
  const [productName, setProductName] = useState();
  const [searchData, setSearchData] = useState();
  const [productsData, setProductsData] = useState();
  const [totalPayment, setTotalPayment] = useState();
  const [salesItem, setSalesItem] = useState();
  const [customerName, setCustomerName] = useState();
  const [totalStock, setTotalStock] = useState([]);
  const [stockMessage, setStockMessage] = useState();

  const [totalSalePayment,setTotalSalePayment]=useState();
  const skipNextSearch = useRef(false);
  const [id, setId] = useState();
  const actionData = useActionData();
  const {
    refetchSales,
    refetchExpenses,
    refetchCashTransactions,
    refetchTotalOnlineTransactions,
    refetchSalesBalance,
    refetchExpensesBalance,
  } = useTransactionContext();

  //This useeffect will run whenever any new entry is made to the transactions table through cash or sales
  useEffect(() => {
    if (actionData?.success === true) {
      refetchSales();
      refetchExpenses();
      refetchCashTransactions();
      refetchTotalOnlineTransactions();
      refetchSalesBalance();
      refetchExpensesBalance();
    }
    const timeOutId = setTimeout(async () => {
      if (skipNextSearch.current) {
        skipNextSearch.current = false;
        return;
      }
      if (vendorName && !productName) {
        const results = await searchVendors(vendorName);
        console.log(results);
        setSearchData(results);
      }
      if (productName && vendorName) {
        const results = await getProducts(productName, vendorName);
        console.log(results);
        setProductsData(results);
      }
      if (salesItem && customerName) {
        const results = await getCurrentStock(salesItem);
        if (results.length > 0) {
          setStockMessage("");
          setTotalStock(results);
        } else {
          setStockMessage("The item typed is not present");
          setTotalStock([]);
        }
        console.log(totalStock);
      }
    }, 500);
    return () => clearTimeout(timeOutId);
  }, [
    vendorName,
    productName,
    refetchSales,
    actionData,
    refetchExpenses,
    salesItem,
  ]);

  //function to set the total payment that is to be made by the user
  function handleSetTotalPayment(value) {
    if(totalStock.length>0 && totalStock[0].current_quantity>0 ){
 const costPerUnit=Number(totalStock[0].selling_price)
    setTotalSalePayment(()=>Number(value)*costPerUnit)
    }
   

  }
  //get the transaction type form the radio buttons
  function getTransactionType(event) {
    setTransactionType(event.target.value);
  }
  //function to set the vendor name from the data base
  function handeSupabaseSearch(curEl) {
    setVendorName(curEl.vendor_name);
    setSearchData([]);
    skipNextSearch.current = true;
  }
  function handeSupabaseItemSearch(curEl) {
    console.log(curEl);
    setProductName(curEl.product_name);
    setTotalPayment(curEl.total_payment);
    setId(curEl.id);
    setProductsData([]);
    skipNextSearch.current = true;
  }

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const hoverStyles = {
    backgroundColor: "#4a32b8",
    transform: "scale(1.05)",
    transition: "all 0.3s ease-in-out",
    color: "white",
  };
  return (
    <div>
      <Form
        action="/transactions"
        method="post"
        className="absolute top-20 left-100 bg-white md:z-40 rounded-[10px] w-[50%] h-[75%] shadow-box flex flex-col md:items-start md:justify-between md:py-8 md:px-5"
      >
        <div className="flex w-[90%] justify-center items-center">
          <div className="flex justify-start gap-20">
            <div>
              <input
                type="radio"
                checked={transactionType === "expense"}
                value="expense"
                name="transactionType"
                id=""
                className="mr-2"
                onChange={getTransactionType}
              />
              <label htmlFor="Expense" className="text-2xl font-medium">
                Expense
              </label>
            </div>
            <div>
              <input
                type="radio"
                checked={transactionType === "sale"}
                value="sale"
                name="transactionType"
                id=""
                className="mr-2"
                onChange={getTransactionType}
              />
              <label htmlFor="Expense" className="text-2xl font-medium">
                sale
              </label>
            </div>
          </div>
        </div>
        {transactionType === "expense" ? (
          <>
            <div className="flex w-[90%] justify-between items-center">
              <label htmlFor="vendorName">Vendor Name :</label>
              <div className="flex md:flex-col gap-2 relative">
                <input
                  required
                  type="text"
                  name="name"
                  id="name"
                  className="shadow-box px-4 py-2 ml-2 rounded-[10px]"
                  onChange={(e) => setVendorName(e.target.value)}
                  value={vendorName}
                />
                {searchData?.length > 0 && (
                  <ul className="ml-3 bg-white shadow-box px-2 absolute top-10 w-[100%] z-10 py-2 rounded-[10px] ">
                    {searchData.map((el) => (
                      <li
                        onClick={() => handeSupabaseSearch(el)}
                        className="text-black mb-3 px-2 py-2 hover:bg-gray-100"
                      >
                        {el.vendor_name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            <div className="flex w-[90%] justify-between items-center">
              <label htmlFor="itemName">Item Name :</label>
              <div className="relative">
                <input
                  required
                  type="text"
                  name="itemName"
                  id="itemName"
                  className="shadow-box px-4 py-2 ml-2 rounded-[10px]"
                  onChange={(e) => setProductName(e.target.value)}
                  value={productName}
                />
                {productsData?.length > 0 && (
                  <ul className="ml-3 bg-white shadow-box px-2 absolute top-10 w-[100%] z-10 py-2 rounded-[10px] ">
                    {productsData?.map((el) => (
                      <li
                        onClick={() => handeSupabaseItemSearch(el)}
                        className="text-black mb-3 px-2 py-2 hover:bg-gray-100"
                      >
                        {el.product_name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            <input type="text" name="id" id="id" hidden value={id} />

            <div className="flex w-[90%] justify-between items-center">
              <label htmlFor="payment">Payment:</label>
              <input
                type="text"
                name="payment"
                id="payment"
                className="shadow-box px-4 py-2 ml-2 rounded-[10px]"
                disabled={true}
                value={totalPayment}
                readOnly
              />
              <input type="text" hidden value={totalPayment} name="payment" />
            </div>
            <div className="flex w-[90%] justify-between items-center">
              <label htmlFor="paid">Amount Paid:</label>
              <input
                type="text"
                name="paid"
                id="paid"
                className="shadow-box px-4 py-2 ml-2 rounded-[10px]"
              />
            </div>

            <div className="flex w-[90%] justify-between items-center">
              <label htmlFor="paid">Payment Method:</label>
              <input
                type="text"
                name="paymentMethod"
                id="paymentMethod"
                className="shadow-box px-4 py-2 ml-2 rounded-[10px]"
              />
            </div>
          </>
        ) : (
          <>
            <div className="flex w-[90%] justify-between items-center">
              <label htmlFor="vendorName">Name :</label>
              <input
                required
                type="text"
                name="name"
                id="name"
                className="shadow-box px-4 py-2 ml-2 rounded-[10px]"
                onChange={(e) => setCustomerName(e.target.value)}
              />
            </div>
            <div className="flex w-[90%] justify-between items-center">
              <label htmlFor="itemPurchased">Item purchased :</label>
              <input
                required
                type="text"
                name="itemPurchased"
                id="itemPurchased"
                className="shadow-box px-4 py-2 ml-2 rounded-[10px]"
                onChange={(e) => setSalesItem(e.target.value)}
              />
            </div>
            <input
              hidden
              required
              type="text"
              name="stock"
              value={
                totalStock[0]?.current_quantity > 0
                  ? totalStock[0]?.current_quantity
                  : ''
              }
            />
            {stockMessage && (
              <div className="w-[90%] flex md:justify-end">
                <p className="text-red-800 text-[1.2rem] font-bold">
                  {stockMessage}
                </p>
              </div>
            )}
            <div className="flex w-[90%] justify-between items-center">
              <label htmlFor="quantity">Available Stock:</label>
              <input
                required
                type="text"
                name="stock"
                id="stock"
                value={
                  totalStock[0]?.current_quantity > 0
                    ? totalStock[0]?.current_quantity
                    : ''
                }
                readOnly
                className="shadow-box px-4 py-2 ml-2 rounded-[10px]"
              />
            </div>
            {/* <input
              required
              type="text"
              name="stock"
              id="stock"
              value={totalStock[0]}
              hidden
              className="shadow-box px-4 py-2 ml-2 rounded-[10px]"
            /> */}
            <div className="flex w-[90%] justify-between items-center">
              <label htmlFor="quantity">Quantity:</label>
              <input
                required
                type="text"
                name="quantity"
                id="quantity"
                className="shadow-box px-4 py-2 ml-2 rounded-[10px]"
                onChange={(e)=>handleSetTotalPayment(e.target.value)}
              />
            </div>
            <div className="flex w-[90%] justify-between items-center">
              <label htmlFor="payment">Payment:</label>
              <input
                type="text"
                name="payment"
                id="payment"
                className="shadow-box px-4 py-2 ml-2 rounded-[10px]"
                readOnly
                value={totalSalePayment}
              />
            </div>
            <input
                type="text"
                name="payment"
                id="payment"
                className="shadow-box px-4 py-2 ml-2 rounded-[10px]"
                hidden
                value={totalSalePayment}
              />
            <div className="flex w-[90%] justify-between items-center">
              <label htmlFor="paid">Amount Paid:</label>
              <input
                type="text"
                name="paid"
                id="paid"
                className="shadow-box px-4 py-2 ml-2 rounded-[10px]"
              />
            </div>

            <div className="flex w-[90%] justify-between items-center">
              <label htmlFor="paid">Payment Method:</label>
              <input
                type="text"
                name="paymentMethod"
                id="paymentMethod"
                className="shadow-box px-4 py-2 ml-2 rounded-[10px]"
              />
            </div>
          </>
        )}

        <div className="w-full flex justify-center mt-5">
          <ButtonGroup>
            <Button
              sx={{ "&:hover": hoverStyles }}
              type="submit"
              loading={isSubmitting}
              loadingPosition="start"
              name="_action"
              value="create"
            >
              Add Transaction
            </Button>
          </ButtonGroup>
        </div>
      </Form>
      <div
        onClick={() => formStatus((cur) => !cur)}
        className="overflow-hidden absolute inset-0 bg-black/30 backdrop-blur-[6px] z-20 h-[100vh] w-full"
      ></div>
    </div>
  );
}

export default TransactionForm;
