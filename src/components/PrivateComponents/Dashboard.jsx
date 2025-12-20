import { Paper, Table, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useAuth } from "../../context/AuthContext"
import DashboardCard from "../Cards/DashboardCard";
import StockChart from "../Charts/StockChart";
import DashboardPieChart from "../Graphs/DashboardPieChart";
import DashboardRevenueGraph from "../Graphs/DashboardRevenueGraph";

function Dashboard() {
    const {session}=useAuth();
    console.log(session);
    return (
       <section id="dashboard">
        <div className="dashboard-content">
            <DashboardCard name='Total Revenue' value='12000' showCurrencyCount={true} showPercentage={false} />
             <DashboardCard name='Avg Sales Value' value='120' showCurrencyCount={true} showPercentage={false}/>
            <DashboardCard name='Transaction Count' value='120' showCurrencyCount={false} showPercentage={false} />
            <DashboardCard name='Growth Percentage' value='120' showCurrencyCount={false} showPercentage={true}/>
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
                
                 
                
              </Table>
            </TableContainer>
          </Paper>
        </div>
           
        </div>
        
       </section>
    )
}

export default Dashboard
