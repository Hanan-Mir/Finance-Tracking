import {
  createTheme,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  ThemeProvider,
} from "@mui/material";
import { useEffect, useMemo, useRef, useState } from "react";
import TransactionForm from "../Forms/TransactionForm";
import {
    Form,
  useActionData,
  useLoaderData,
  useSearchParams,
} from "react-router-dom";
import { formatDate } from "../../Helper-Functions/helperFunctions";
import { toast, ToastContainer } from "react-toastify";
import { handleGenerateCSV } from "../../Helper-Functions/utilityFunctions";
import { useManagmentContext } from "../../context/ManagmentContext";
import { useTransactionContext } from "../../context/TransactionContext";
import SummaryPieChart from "../Graphs/SummaryPieChart";
import { useReactToPrint } from "react-to-print";
import Reciept from "../Reciepts/Reciept";
import TransactionEdit from "../Forms/TransactionEdit";
import TransactionCard from "../Cards/TransactionCard";
import { useDarkMode } from "../../context/DarkModeContext";

function Transactions() {
  const [formStatus, setFormStatus] = useState(false);
  const [dropDownView, setDropDownView] = useState(false);
  const {getManagmentData}=useManagmentContext();
  const formActionData = useActionData();
  const loaderData = useLoaderData();
  const [searchparams, setSearchparams] = useSearchParams();
  const {salesValue,expensesValue,salesCompare,expensesCompare}=useTransactionContext();
  const [rowsPerPage,setRowsPerPage]=useState(10)
  const [page,setPage]=useState(0)
  const printRef=useRef();
  const [selectedTransaction,setSelectedTransaction]=useState()
  const [transactionEditView,setTransactionEditView]=useState(false)
  const {isDarkMode}=useDarkMode();
   const darkTheme=createTheme({
        palette:{
          mode:isDarkMode?'dark':'light',
          background:{
            TableContainer:'#1e1e1e'
          }
        }
      })
  const filterOptions = [
    { label: "Sale", type: "transaction_type", value: "sale" },
    { label: "Expense", type: "transaction_type", value: "expense" },
    { label: "Cash", type: "payment_mode", value: "cash" },
    { label: "Online", type: "payment_mode", value: "online" },
  ];
  //optimization for getting data from the supabase 
  const transactionData=useMemo(()=>{
 return loaderData ? loaderData.transaction_data : [];
  },[loaderData])
  
  //using the action data that is returned from the form submission
  useEffect(()=>{
    if(!formActionData?.success) return
    console.log(formActionData)
      if(formActionData?.success){
    toast.success(`${formActionData?.message}`, {
position: "top-center",
autoClose: 3000,
hideProgressBar: true,
closeOnClick: false,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme:'dark'
});

if(formActionData.kind==='create'){
setFormStatus(curStatus=>!curStatus)
}
if(formActionData.kind==='edit'){
  setTransactionEditView(curStatus=>!curStatus)
}


  }
   if(!formActionData?.success){
  toast.error(`${formActionData?.message}`, {
position: "top-center",
autoClose: 3000,
hideProgressBar: true,
closeOnClick: false,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "dark",
});
if(formActionData.kind==='create'){
handleTransactionForm()
}else{
  setTransactionEditView(curStatus=>!curStatus)
}
 } 
  },[formActionData])


  //function to handle the transaction edit
  function handleTransactionEditView(transaction){
    setTransactionEditView(curView=>!curView)
    setSelectedTransaction(transaction)
  }
  //function to handle the filter
  async function handleFilter(filterType, filterValue) {
    const managmentData=await getManagmentData()

    if(managmentData.length===0){
      return
    }
    const newSearchParams = new URLSearchParams(searchparams);
    if (filterValue) {
      newSearchParams.set(filterType, filterValue);
      setSearchparams(newSearchParams);
    } else {
      console.log("else part");
      setSearchparams(new URLSearchParams());
    }
    handleDropDownView();
  }
  //function to handle the search results
  function handleSearchTransaction(event){
    const query=event.target.value;
    const newSearchParams=new URLSearchParams(searchparams);
    if(query){
      newSearchParams.set('q',query)
      setSearchparams(newSearchParams)
    }else{
      setSearchparams(new URLSearchParams())
    }
  }

  //function to change the dropDown veiw
  function handleDropDownView() {
    setDropDownView((curStatus) => !curStatus);
  }

  //function to open transaction form
  function handleTransactionForm() {
    setFormStatus((curStatus) => !curStatus);
  }
  //functions related to the pagination
  function handleChangePage(event,newPage){
    console.log(newPage);
    setPage(newPage)

  }
  function handleChangeRowsPerPage(event){
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0)
  }
  //function to handle print receipt functionality
 const handlePrint=useReactToPrint({
  contentRef:printRef,
 })
  function onPrintClick(curTransaction){
    setSelectedTransaction(curTransaction)
    setTimeout(()=>{
handlePrint();

    },200)
    
  } 
  const tableData=useMemo(()=>{
    return transactionData?.slice(page*rowsPerPage,page*rowsPerPage+rowsPerPage)
  },[page,rowsPerPage,transactionData])
  return (
    <section id="transaction">
      <div className="content">
        <ToastContainer />
        {formStatus && <TransactionForm formStatus={setFormStatus} />}
        <TransactionCard name='sales' value={salesValue} comparePercentage={salesCompare} />
        <TransactionCard name='Expenses' value={expensesValue} comparePercentage={expensesCompare} />
        
        <div className="summary">
          <div className="summary-wrapper">
          <SummaryPieChart isAnimationActive={true} />
        </div>
        </div>
        <div className="transaction-container">
          <h1 className="text-[1.8rem] text-[#969696] font-bold">
            Transactions
          </h1>
          <div className="flex md:justify-between md:items-center">
            <Form id="search-form" role="search">
            <input
            
              type="search"
              name="q"
              id="q"
              className="border rounded-md py-2 px-3 dark:border-white dark:text-white"
              placeholder="Search by name"
              onChange={handleSearchTransaction}
            />
            </Form>
            <div className="flex md:items-center">
              <div className="mt-0 bg-[#0252CF] relative dark:bg-gray-800">
                <div
                  onClick={() => handleDropDownView()}
                  className="px-4 py-2 flex gap-2 text-white rounded-2xl hover:cursor-pointer"
                >
                  <span className="font-medium">Filter</span>
                  {!dropDownView ? (
                    <span className="ml-2">&#9660;</span>
                  ) : (
                    <span className="ml-2">&#9650;</span>
                  )}
                </div>
                {dropDownView && (
                  <ul className="text-white w-[150%] border px-2 py-4 absolute z-20 top-11 bg-[#0252CF] dark:bg-gray-800 ">
                    {filterOptions.map((filterEl) => (
                      <li
                        onClick={() =>
                          handleFilter(filterEl.type, filterEl.value)
                        }
                        className="mb-2 px-2 py-1 rounded-lg font-bold hover:bg-gray-300"
                      >
                        {filterEl.label}
                      </li>
                    ))}
                    <li
                      onClick={() => handleFilter()}
                      className="mb-2 text-red-800 px-2 py-1 rounded-lg font-bold hover:bg-gray-300"
                    >
                      Clear Filter
                    </li>
                  </ul>
                )}
              </div>

              <div className="flex md:items-center">
                <button
                disabled={transactionData.length===0}
                  onClick={() =>
                    handleGenerateCSV(
                      "transactions_table",
                      "report",
                      transactionData
                    )
                  }
                  className="ml-2 mr-2 px-2 py-2 bg-[#1A87D0] text-white font-bold hover:cursor-pointer flex md:items-center gap-2 dark:bg-gray-800"
                >
                  <img src="/images/csv.png" alt="" className="w-5 h-5" />
                  <span>Export CSV</span>
                </button>
                <button
                  onClick={() => handleTransactionForm()}
                  disabled={getManagmentData()?.length===0}
                  className=" px-2 py-2 bg-[#0252CF] text-white font-bold hover:cursor-pointer dark:bg-gray-800"
                >
                  Add Transaction
                </button>
              </div>
            </div>
          </div>
          <div className="mt-3">
            <ThemeProvider theme={darkTheme}>
            <Paper sx={{ width: "100%", overflow: "hidden" }}>
              <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: "bold", fontSize: "1rem" }}>
                        Name
                      </TableCell>
                      <TableCell sx={{ fontWeight: "bold", fontSize: "1rem" }}>
                        Item
                      </TableCell>
                      <TableCell sx={{ fontWeight: "bold", fontSize: "1rem" }}>
                        Mode
                      </TableCell>
                      <TableCell
                        sx={{ fontWeight: "bold", fontSize: "1.2rem" }}
                      >
                        Type
                      </TableCell>
                      <TableCell
                        sx={{ fontWeight: "bold", fontSize: "1.2rem" }}
                      >
                        Payment
                      </TableCell>
                      <TableCell
                        sx={{ fontWeight: "bold", fontSize: "1.2rem" }}
                      >
                        Paid
                      </TableCell>
                      <TableCell
                        sx={{ fontWeight: "bold", fontSize: "1.2rem" }}
                      >
                        Balance
                      </TableCell>
                      <TableCell
                        sx={{ fontWeight: "bold", fontSize: "1.2rem" }}
                      >
                        Date
                      </TableCell>
                       <TableCell
                        sx={{ fontWeight: "bold", fontSize: "1.2rem" }}
                      >
                        Actions
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {tableData?.map((transactionData,index) => (
                      <TableRow key={index}>
                        <TableCell>{transactionData.name}</TableCell>
                        <TableCell>{transactionData.item_name}</TableCell>
                        <TableCell>{transactionData.payment_mode}</TableCell>
                        <TableCell>
                          <span
                            className={`${
                              transactionData.transaction_type === "sale"
                                ? "bg-green-700"
                                : "bg-blue-600"
                            } px-2 py-2 rounded-2xl text-white font-bold`}
                          >
                            {transactionData.transaction_type}
                          </span>
                        </TableCell>
                        <TableCell>{transactionData.payment}</TableCell>
                        <TableCell>{transactionData.amount_paid}</TableCell>
                        <TableCell>
                          {" "}
                          <span className="bg-yellow-300 px-2 py-2 rounded-2xl">
                            {" "}
                            {transactionData.balance}{" "}
                          </span>
                        </TableCell>
                        <TableCell>
                          {formatDate(transactionData.created_at)}
                        </TableCell>
                        <TableCell sx={{display:'flex',justifyContent:'center'}} >
                          
                        <img src="images/reciept.png" alt="" className="w-5 hover:cursor-pointer mr-2" onClick={()=>onPrintClick(transactionData)}  />
                        <img src="images/edit.png" alt="" className="w-5 hover:cursor-pointer" onClick={()=>handleTransactionEditView(transactionData)} />
                       
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={transactionData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
            </ThemeProvider>
          </div>
        </div>
      </div>
        {transactionEditView && <TransactionEdit transactionData={selectedTransaction} formStatus={setTransactionEditView}  />}
  
      <div style={{ display:'none' }}>
        
        <Reciept ref={printRef} transaction={selectedTransaction} />
      </div>
    </section>
  );
}

export default Transactions;
