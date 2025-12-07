import { Paper, Table, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material"
import { useState } from "react"
import TransactionForm from "../Forms/TransactionForm";

function Transactions() {
    const [formStatus,setFormStatus]=useState(false);
 
    //function to open transaction form
    function handleTransactionForm(){
        setFormStatus(curStatus=>!curStatus)
    }
    return (
        <section id="transaction">
           <div className="content">
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
                <div className="flex md:justify-end">
                    <button onClick={()=>handleTransactionForm()} className="border px-2 py-2 bg-[#0252CF] text-white font-bold hover:cursor-pointer">Add Transaction</button>
                </div>
                <div className="mt-3">
                    <Paper sx={{width:'100%',overflow:'hidden'}} >
                        <TableContainer sx={{maxHeight:440}}>
                            <Table stickyHeader>
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{fontWeight:'bold',fontSize:'1.2rem'}}>
                                            Name
                                        </TableCell>
                                        <TableCell sx={{fontWeight:'bold',fontSize:'1.2rem'}}>
                                          Item
                                        </TableCell>
                                        <TableCell sx={{fontWeight:'bold',fontSize:'1.2rem'}}>
                                          Transaction  Type
                                        </TableCell>
                                        <TableCell sx={{fontWeight:'bold',fontSize:'1.2rem'}}>
                                            Total Payment
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
