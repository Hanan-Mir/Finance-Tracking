import { createTheme, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, ThemeProvider } from "@mui/material";
import TransactionCard from "../Cards/TransactionCard";
import SalesGraph from "../Graphs/SalesGraph";
import SalesGraphMonthly from "../Graphs/SalesGraphMonthly";
import { useLoaderData } from "react-router-dom";
import { compare } from "../../Helper-Functions/utilityFunctions";
import { formatDate } from "../../Helper-Functions/helperFunctions";
import { useDarkMode } from "../../context/DarkModeContext";

function Sales() {
  const {curMonthSales,curMonthlySalesBalance,prevMonthSales,prevMonthSalesBalance,recentSalesTransaction}=useLoaderData();
  const {isDarkMode}=useDarkMode()
  const darkTheme=createTheme({
        palette:{
          mode:isDarkMode?'dark':'light',
          background:{
            TableContainer:'#1e1e1e'
          }
        }
      })
  
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
        
        <div className="graph px-2 py-2">
          <SalesGraph />
        </div>
        <div className="salesMonthly px-2 py-2">
          <SalesGraphMonthly />
        </div>
        <div className="salesTable">
          <h1 className="text-[1.8rem] text-[#969696] font-bold">Recent Sales</h1>
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
          </ThemeProvider>
        </div>
      </div>
    </section>
  );
}

export default Sales;
