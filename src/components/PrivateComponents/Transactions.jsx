import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { useMemo, useState } from "react";
import TransactionForm from "../Forms/TransactionForm";
import {
    Form,
  useActionData,
  useLoaderData,
  useSearchParams,
} from "react-router-dom";
import { formatDate } from "../../Helper-Functions/helperFunctions";
import { ToastContainer } from "react-toastify";
import { handleGenerateCSV } from "../../Helper-Functions/utilityFunctions";
import { useManagmentContext } from "../../context/ManagmentContext";
import { useTransactionContext } from "../../context/TransactionContext";
import SummaryPieChart from "../Graphs/SummaryPieChart";

function Transactions() {
  const [formStatus, setFormStatus] = useState(false);
  const [dropDownView, setDropDownView] = useState(false);
  const {getManagmentData}=useManagmentContext();
  const formAction = useActionData();
  const loaderData = useLoaderData();
  const [searchparams, setSearchparams] = useSearchParams();
  const {salesValue,expensesValue}=useTransactionContext();
  const [rowsPerPage,setRowsPerPage]=useState(10)
  const [page,setPage]=useState(0)
  const filterOptions = [
    { label: "Sale", type: "transaction_type", value: "sale" },
    { label: "Expense", type: "transaction_type", value: "expense" },
    { label: "Cash", type: "payment_mode", value: "cash" },
    { label: "Online", type: "payment_mode", value: "online" },
  ];
  const transactionData = loaderData ? loaderData.transaction_data : [];
  
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
  const tableData=useMemo(()=>{
    return transactionData?.slice(page*rowsPerPage,page*rowsPerPage+rowsPerPage)
  },[page,rowsPerPage,transactionData])
  return (
    <section id="transaction">
      <div className="content">
        <ToastContainer />
        {formStatus && <TransactionForm formStatus={setFormStatus} />}
        <div className="card">
          <h1 className="font-bold text-[2rem]">Sales</h1>
          <div className="flex md:justify-between md:items-center">
            <div className="py-2">
              <p className="text-[1.5rem] font-bold">{salesValue} ₹</p>
              <p className="text-[#969696]">vs last month</p>
            </div>
            <div className="h-[50%] flex gap-1 items-center justify-center border border-red-600  rounded-[10px] px-2">
              <img src="/images/down.png" alt="" className="w-4 h-4 p-0" />
              <p className="p-0 text-[15px] text-red-600">15%</p>
            </div>
          </div>
        </div>
        <div className="card">
          <h1 className="font-bold text-[2rem]">Expenses</h1>
          <div className="flex md:justify-between md:items-center">
            <div className="py-2">
              <p className="text-[1.5rem] font-bold">{expensesValue} ₹</p>
              <p className="text-[#969696]">vs last month</p>
            </div>
            <div className="h-[50%] flex gap-1 items-center justify-center border border-red-600  rounded-[10px] px-2">
              <img src="/images/up.png" alt="" className="w-4 h-4 p-0" />
              <p className="p-0 text-[15px] text-red-600">15%</p>
            </div>
          </div>
        </div>
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
            disabled={transactionData.length===0}
              type="search"
              name="q"
              id="q"
              className="border rounded-md py-2 px-3"
              placeholder="Search by name"
              onChange={handleSearchTransaction}
            />
            </Form>
            <div className="flex md:items-center">
              <div className="mt-0 bg-[#0252CF] relative">
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
                  <ul className="text-white w-[150%] border px-2 py-4 absolute z-20 top-11 bg-[#0252CF] ">
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
                  className="border px-2 py-2 bg-[#1A87D0] text-white font-bold hover:cursor-pointer flex md:items-center gap-2"
                >
                  <img src="/images/csv.png" alt="" className="w-5 h-5" />
                  <span>Export CSV</span>
                </button>
                <button
                  onClick={() => handleTransactionForm()}
                  disabled={getManagmentData().length===0}
                  className="border px-2 py-2 bg-[#0252CF] text-white font-bold hover:cursor-pointer"
                >
                  Add Transaction
                </button>
              </div>
            </div>
          </div>
          <div className="mt-3">
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
                          
                        <img src="images/reciept.png" alt="" className="w-5 hover:cursor-pointer mr-2"  />
                        <img src="images/edit.png" alt="" className="w-5 hover:cursor-pointer" />
                       
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
          </div>
        </div>
      </div>
    </section>
  );
}

export default Transactions;
