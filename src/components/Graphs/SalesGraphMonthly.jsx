import { useLoaderData } from "react-router-dom";
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from "recharts";


function SalesGraphMonthly ({ isAnimationActive = true }) {
  const {monthlySalesData}=useLoaderData()
  console.log(monthlySalesData)
  return(<BarChart style={{ width: '100%', maxWidth: '700px', maxHeight: '78vh', aspectRatio: 1.618 }} responsive data={monthlySalesData}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="name" />
    <YAxis width="auto" />
    <Tooltip />
    <Legend />
  
    <Bar dataKey="sale" fill="blue" isAnimationActive={isAnimationActive} />
  </BarChart>
)};

export default SalesGraphMonthly;