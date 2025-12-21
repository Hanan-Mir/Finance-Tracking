import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useAuth } from "../../context/AuthContext"
import DashboardCard from "../Cards/DashboardCard";
import StockChart from "../Charts/StockChart";
import DashboardPieChart from "../Graphs/DashboardPieChart";
import DashboardRevenueGraph from "../Graphs/DashboardRevenueGraph";
import { useLoaderData } from "react-router-dom";
import { formatDate } from "../../Helper-Functions/helperFunctions";

function Dashboard() {
  
    const {totalRevenue,averageSaleValue,transactionCount,growthPercentage,recentTransactions,data}=useLoaderData();
    console.log(data)
    return (
       <section id="dashboard">
        <div className="dashboard-content">
            <DashboardCard name='Total Revenue' value={totalRevenue} showCurrencyCount={true} showPercentage={false} />
             <DashboardCard name='Avg Sales Value' value={averageSaleValue} showCurrencyCount={true} showPercentage={false}/>
            <DashboardCard name='Transaction Count' value={transactionCount

            } showCurrencyCount={false} showPercentage={false} />
            <DashboardCard name='Growth Percentage' value={growthPercentage} showCurrencyCount={false} showPercentage={true}/>
         <div className="revenueGraph">
           <h1 className="text-[1.8rem] text-[#969696] font-bold mb-2 ml-2">Weekly Revenue</h1>

            <DashboardRevenueGraph />
            </div>   
            <div className="totalSummary">
            <h1 className="text-[1.8rem] text-[#969696] font-bold mb-4 ml-2">Business Summary</h1>
            <DashboardPieChart />
        </div>
        <div className="recentTransactions">
            <h1 className="text-[1.8rem] text-[#969696] font-bold mb-2 ml-2 mt-3">Recent Transactions</h1>
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
                    
                    
                    <TableCell sx={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                      Payment
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                      Paid
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                      Balance
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                      Date
                    </TableCell>
                    
                  </TableRow>
                </TableHead>
                {recentTransactions.map((transaction)=>(
                  <TableBody>
                    <TableCell>{transaction.name}</TableCell>
                     <TableCell>{transaction.item_name}</TableCell>
                      <TableCell>{transaction.payment}</TableCell>
                       <TableCell>{transaction.amount_paid}</TableCell>
                        <TableCell><span className="bg-blue-800 text-white px-2 py-2 rounded-[11px]">{transaction.balance} </span></TableCell>
                         <TableCell>{formatDate(transaction.created_at)}</TableCell>

                  </TableBody>
                ))}
                 
                
              </Table>
            </TableContainer>
          </Paper>
        </div>
           
        </div>
        
       </section>
    )
}

export default Dashboard
