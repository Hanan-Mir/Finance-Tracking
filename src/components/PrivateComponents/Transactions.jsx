import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material"
import { useState } from "react"
import TransactionForm from "../Forms/TransactionForm";
import { useActionData, useLoaderData } from "react-router-dom";
import { formatDate, } from "../../Helper-Functions/helperFunctions";
import { ToastContainer } from "react-toastify";
import { handleGenerateCSV } from "../../Helper-Functions/utilityFunctions";

function Transactions() {
    const [formStatus,setFormStatus]=useState(false);
    const formAction=useActionData();
    const loaderData=useLoaderData();
    const transactionData=loaderData?loaderData.transaction_data:[]
    
   
 
    //function to open transaction form
    function handleTransactionForm(){
        setFormStatus(curStatus=>!curStatus)
    }
    return (
        <section id="transaction">
           
           <div className="content">
             <ToastContainer />
            {formStatus && <TransactionForm formStatus={setFormStatus} />} 
            <div className="card">

                <h1 className='font-bold text-[2rem]'>Sales</h1>
                <div className="flex md:justify-between md:items-center">
                    <div className="py-2">
                <p className="text-[1.5rem] font-bold">12000 ₹</p>
                <p className="text-[#969696]">vs last month</p>
                </div>
                <div className="h-[50%] flex gap-1 items-center justify-center border border-red-600  rounded-[10px] px-2">
                    <img src="/images/down.png" alt="" className="w-4 h-4 p-0" />
                    <p className="p-0 text-[15px] text-red-600">15%</p>
                </div>
                </div>
            </div>
            <div className="card">

                <h1 className='font-bold text-[2rem]'>Expenses</h1>
                <div className="flex md:justify-between md:items-center">
                    <div className="py-2">
                <p className="text-[1.5rem] font-bold">12000 ₹</p>
                <p className="text-[#969696]">vs last month</p>
                </div>
                <div className="h-[50%] flex gap-1 items-center justify-center border border-red-600  rounded-[10px] px-2">
                    <img src="/images/up.png" alt="" className="w-4 h-4 p-0" />
                    <p className="p-0 text-[15px] text-red-600">15%</p>
                </div>
                </div>
            </div>
            <div className="card">

                <h1 className='font-bold text-[2rem]'>Profit</h1>
                <div className="flex md:justify-between md:items-center">
                    <div className="py-2">
                <p className="text-[1.5rem] font-bold">12000 ₹</p>
                <p className="text-[#969696]">vs last month</p>
                </div>
                <div className="h-[50%] flex gap-1 items-center justify-center border border-red-600  rounded-[10px] px-2">
                    <img src="/images/up.png" alt="" className="w-4 h-4 p-0" />
                    <p className="p-0 text-[15px] text-red-600">15%</p>
                </div>
                </div>
            </div>
            <div className="transaction-container">
                
                <h1 className="text-[1.8rem] text-[#969696] font-bold">Transactions</h1>
                <div className="flex md:justify-between md:items-center">
                    <input type="text" name="" id="" className="border rounded-md py-2 px-3" placeholder="Search by name" />
                    <div className="flex md:items-center">
                        <div className="mt-0 bg-[#0252CF] relative">
                            <div className="px-4 py-2 flex gap-2 text-white rounded-2xl hover:cursor-pointer">
                                <span className="font-medium">Filter</span>
                                <span className="ml-2">&#9660;</span>
                            </div>
                            <ul className="text-white hidden w-full border px-2 py-4 absolute z-20 top-11 bg-[#0252CF] ">
                                <li className="mb-2 px-2 py-1 rounded-lg font-bold hover:bg-gray-300">Sale</li>
                                <li className="mb-2 px-2 py-1 rounded-lg font-bold hover:bg-gray-300">Expense</li>
                                <li className="mb-2 px-2 py-1 rounded-lg font-bold hover:bg-gray-300">cash</li>
                                <li className="mb-2 px-2 py-1 rounded-lg font-bold hover:bg-gray-300">online</li>
                            </ul>

                        </div>



<div className="flex md:items-center">
                    <button onClick={()=>handleGenerateCSV('transactions_table','report',transactionData)}  className="border px-2 py-2 bg-[#1A87D0] text-white font-bold hover:cursor-pointer flex md:items-center gap-2">
                        <img src="/images/csv.png" alt="" className="w-5 h-5" />
                        <span>Export CSV</span>
                    </button>
                    <button onClick={()=>handleTransactionForm()} className="border px-2 py-2 bg-[#0252CF] text-white font-bold hover:cursor-pointer">Add Transaction</button>
                </div>
                </div>
                </div>
                <div className="mt-3">
                    <Paper sx={{width:'100%',overflow:'hidden'}} >
                        <TableContainer sx={{maxHeight:440}}>
                            <Table stickyHeader>
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{fontWeight:'bold',fontSize:'1rem'}}>
                                            Name
                                        </TableCell>
                                        <TableCell sx={{fontWeight:'bold',fontSize:'1rem'}}>
                                          Item
                                        </TableCell>
                                        <TableCell sx={{fontWeight:'bold',fontSize:'1rem'}}>
                                          Mode
                                        </TableCell>
                                        <TableCell sx={{fontWeight:'bold',fontSize:'1.2rem'}}>
                                          Type
                                        </TableCell>
                                        <TableCell sx={{fontWeight:'bold',fontSize:'1.2rem'}}>
                                            Payment
                                        </TableCell>
                                        <TableCell sx={{fontWeight:'bold',fontSize:'1.2rem'}}>
                                            Paid
                                        </TableCell>
                                        <TableCell sx={{fontWeight:'bold',fontSize:'1.2rem'}}>
                                            Balance
                                        </TableCell>
                                        <TableCell sx={{fontWeight:'bold',fontSize:'1.2rem'}}>
                                            Date
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {transactionData?.map((transactionData)=>(
                                        <TableRow >
                  <TableCell>{transactionData.name}</TableCell>
                  <TableCell>{transactionData.item_name}</TableCell>
                  <TableCell>{transactionData.payment_mode}</TableCell>
                  <TableCell><span className={`${transactionData.transaction_type==='sale'?'bg-green-700':'bg-blue-600'} px-2 py-2 rounded-2xl`}>{transactionData.transaction_type}</span></TableCell>
                  <TableCell>{transactionData.payment}</TableCell>
                  <TableCell>{transactionData.amount_paid}</TableCell>
                  <TableCell > <span className="bg-yellow-300 px-2 py-2 rounded-2xl"> {transactionData.balance} </span></TableCell>
                  <TableCell>{formatDate(transactionData.created_at)}</TableCell>
                  
                  </TableRow>
                                    ))}
                                </TableBody>

                            </Table>
                        </TableContainer>
                        <TablePagination
                        rowsPerPageOptions={[10,25,100]}
                        component="div"
                        count={10}
                        rowsPerPage={10}
                         />

                    </Paper>
                </div>

            </div>
            </div>


        </section>
    )
}

export default Transactions
