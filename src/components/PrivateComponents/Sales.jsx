import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import TransactionCard from "../Cards/TransactionCard";
import SalesGraph from "../Graphs/SalesGraph";
import SalesGraphMonthly from "../Graphs/SalesGraphMonthly";
import { useLoaderData } from "react-router-dom";
import { compare } from "../../Helper-Functions/utilityFunctions";
import { formatDate } from "../../Helper-Functions/helperFunctions";

function Sales() {
  const {curMonthSales,curMonthlySalesBalance,prevMonthSales,prevMonthSalesBalance,recentSalesTransaction}=useLoaderData();
console.log(recentSalesTransaction)
  return (
    <section id="sales">
   
      <div className="sales-content">
       
        <TransactionCard
          name="Monthly Sales"
          value={curMonthSales}
          comparePercentage={compare(curMonthSales,prevMonthSales)}
        />
        <TransactionCard
          name="Sales balance"
          value={curMonthlySalesBalance}
          comparePercentage={compare(curMonthlySalesBalance,prevMonthSalesBalance)}
        />
        
        <div className="graph">
          <SalesGraph />
        </div>
        <div className="salesMonthly">
          <SalesGraphMonthly />
        </div>
        <div className="salesTable">
          <h1 className="text-2xl font-bold">Recent Sales</h1>
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
                
                  {recentSalesTransaction.map((data)=>(
                    <TableBody>
                    <TableCell>{data.name}</TableCell>
                    <TableCell>{data.item_name}</TableCell>
                    <TableCell>{data.payment}</TableCell>
                    <TableCell>{data.amount_paid}</TableCell>
                    <TableCell>{data.balance}</TableCell>
                    <TableCell>{formatDate(data.created_at)}</TableCell>
                    </TableBody>
                  ))}
                
              </Table>
            </TableContainer>
          </Paper>
        </div>
      </div>
    </section>
  );
}

export default Sales;
