import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useLoaderData } from "react-router-dom";
import ApexCharts from "apexcharts";
import StockChart from "../Charts/StockChart";


function Inventory() {
  const { data: productData, InventoryValue, Sales, profit } = useLoaderData();

  return (
    <section className="inventory ">
      <div className="card ">
        <div className="w-full flex md:justify-start md:items-center md:gap-2">
          <img src="/images/supply.png" alt="" className="w-15 h-15" />
          <h1 className="text-white ">Inventory Value</h1>
        </div>
        <p className="text-[2rem] font-bold text-white">{InventoryValue} ₹</p>
      </div>
      <div className="card w-full flex md:flex-col md:justify-between">
        <div className="w-full flex md:justify-start md:items-center md:gap-2 mt-2">
          <img src="/images/profit.png" alt="" className="w-10 h-10" />
          <h1 className="text-white">Total Sales Value</h1>
        </div>
        <p className="text-[2rem] font-bold text-white">{Sales} ₹</p>
      </div>
      <div className="card w-full flex md:flex-col md:justify-between">
        <div className="w-full flex md:justify-start md:items-center md:gap-2 mt-2">
          <img src="/images/profitPer.png" alt="" className="w-10 h-10" />
          <h1 className="text-white">Profit Percentage</h1>
        </div>
        <p className="text-[2rem] font-bold text-white">{profit}% </p>
      </div>
      <div className="table ">
        <TableContainer component={Paper} sx={{ maxHeight: 530 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Product Name</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Selling Price</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>
                  Current Quantity
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Unit</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {productData.map(({ id, product_id }) => (
                <TableRow>
                  <TableCell>{product_id.product_name}</TableCell>
                  <TableCell>{product_id.selling_price}</TableCell>
                  <TableCell>{product_id.current_quantity}</TableCell>
                  <TableCell>{product_id.unit}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      {/* <div className="health  border-none relative rounded-xl ">
       
        
        <div className="w-full h-full inset-0 relative z-20 bg-white flex md:justify-center md:items-center">
        <div className="w-[70%] relative z-5 bg-white overflow-hidden flex md:items-center md:justify-center h-full border-8 rounded-[90%] border-l-amber-400 border-r-amber-900 border-b-blue-900 border-t-purple-950 ">
          
          <div className="w-[80%] h-[80%] border-7 rounded-[90%] flex md:items-center md:justify-center border-r-amber-400 border-l-amber-900 border-t-blue-900 border-b-purple-950">
            <div className="w-[80%] h-[80%] flex md:justify-center md:items-center border-6 rounded-[90%] border-t-amber-400 border-b-amber-900 border-l-blue-900 border-r-purple-950">
              <span className="text-[3rem] font-extrabold text-blue-900">
                80
              </span>
            </div>
          </div>
        </div>
      </div>
      </div> */}
      <div className="health">
      <StockChart />
      </div>
      
      <div className="kpi relative overflow-y-auto">
        
    <div className="w-full h-full inset-2 absolute z-10">
        <div className="w-full flex justify-center">
        <h1 className="text-[2rem] font-bold text-white">KPI</h1>
        </div>
        <div className="kpi-content ">
            <ul className="w-full">
                <li className="w-full flex md:justify-between px-5 mb-4" >
                    <span className="text-white font-bold">Glasses</span>
                <img src="/images/decrease.png" alt="" className="w-8 h-8" />
                </li>
                 <li className="w-full flex md:justify-between px-5 mb-4" >
                    <span className="text-white font-bold">Tissue Paper</span>
                <img src="/images/decrease.png" alt="" className="w-8 h-8" />
                </li>
                 <li className="w-full flex md:justify-between px-5 mb-4" >
                    <span className="text-white font-bold">Wet tissues</span>
                <img src="/images/decrease.png" alt="" className="w-8 h-8" />
                </li>
                 <li className="w-full flex md:justify-between px-5 mb-4" >
                    <span className="text-white font-bold">Burgers</span>
                <img src="/images/decrease.png" alt="" className="w-8 h-8" />
                </li>
                 <li className="w-full flex md:justify-between px-5 mb-4" >
                    <span className="text-white font-bold">Burgers</span>
                <img src="/images/decrease.png" alt="" className="w-8 h-8" />
                </li>
            </ul>
        </div>
        </div>
      </div>

    </section>
  );
}

export default Inventory;
