import { Paper, Table, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import TransactionCard from "../Cards/TransactionCard";
import SalesGraph from "../Graphs/SalesGraph";
import SalesGraphMonthly from "../Graphs/SalesGraphMonthly";

function Sales() {
  return (
    <section id="sales">
      <div className="sales-content">
        <TransactionCard
          name="Total Sales"
          value="20000"
          comparePercentage="80"
        />
        <TransactionCard
          name="Sales balance"
          value="20000"
          comparePercentage="80"
        />
        <TransactionCard
          name="Total Profit"
          value="20000"
          comparePercentage="80"
        />
        <div className="graph">
          <SalesGraph />
        </div>
        <div className="salesMonthly">
          <SalesGraphMonthly />
        </div>
        <div className="salesTable">
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
                    <TableCell sx={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                      Type
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
                    <TableCell sx={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>
              </Table>
            </TableContainer>
          </Paper>
        </div>
      </div>
    </section>
  );
}

export default Sales;
