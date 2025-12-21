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

import StockChart from "../Charts/StockChart";

function Inventory() {
  const {
    currentInventoryValue,
    currentSalesValue,
    profitPercentage,
    itemsWithLowStock,
    user_products: productData,
  } = useLoaderData();
  console.log(productData);

  return (
    <section className="inventory ">
      <div className="inventory-container">

      <div className="card ">
        <div className="w-full flex md:justify-start md:items-center md:gap-2">
          <img src="/images/supply.png" alt="" className="w-15 h-15" />
          <h1 >Inventory Value</h1>
        </div>
        <p className="text-[2rem] font-bold">
          {currentInventoryValue} ₹
        </p>
      </div>
      <div className="card w-full flex md:flex-col md:justify-between">
        <div className="w-full flex md:justify-start md:items-center md:gap-2 mt-2">
          <img src="/images/profit.png" alt="" className="w-10 h-10" />
          <h1 >Total Sales Value</h1>
        </div>
        <p className="text-[2rem] font-bold">
          {currentSalesValue} ₹
        </p>
      </div>
      <div className="card w-full flex md:flex-col md:justify-between">
        <div className="w-full flex md:justify-start md:items-center md:gap-2 mt-2">
          <img src="/images/profitPer.png" alt="" className="w-10 h-10" />
          <h1 >Profit Percentage</h1>
        </div>
        <p className="text-[2rem] font-bold ">{profitPercentage}% </p>
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
              {productData.map((product) => (
                <TableRow >
                  <TableCell>{product.product_name}</TableCell>
                  <TableCell>{product.selling_price}</TableCell>
                  <TableCell>{product.current_quantity}</TableCell>
                  <TableCell>{product.unit}</TableCell>
                  <TableCell>
                    {(product.current_quantity / product.initial_quantity) *
                      100 <
                    20 ? (
                      <p className="bg-amber-900 h-3 w-3 ml-4 rounded-[100%]"></p>
                    ) : (
                      <p className="bg-blue-800 h-3 w-3 ml-4 rounded-[100%]"></p>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <div className="health">
        <StockChart />
      </div>

      <div className="kpi relative overflow-y-auto">
        <div className="w-full h-full inset-2 absolute z-10">
          <div className="w-full flex justify-center">
            <h1 className="text-[2rem] font-bold text-black">KPI</h1>
          </div>
          <div className="kpi-content ">
            <ul className="w-full">
              {itemsWithLowStock.map((item) => (
                <li className="w-full flex md:justify-between px-5 py-2 mb-4 rounded-[10px] hover:bg-gray-200">
                  <span className="text-black font-bold ">
                    {item.product_name.toUpperCase()}
                  </span>
                  <img src="/images/decrease.png" alt="" className="w-8 h-8" />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}

export default Inventory;
