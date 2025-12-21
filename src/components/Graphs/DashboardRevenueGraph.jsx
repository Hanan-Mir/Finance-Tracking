import { useLoaderData } from "react-router-dom";
import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts"

function DashboardRevenueGraph({isAnimationActive=true}) {
   const {data}=useLoaderData()
   console.log(data)
    return (
       <BarChart style={{ width: '100%', maxWidth: '700px', maxHeight: '36vh', aspectRatio: 1.618 }} responsive data={data}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="name" />
    <YAxis width="auto" />
    <Tooltip />
    <Legend />
    <Bar dataKey="current" fill="#8884d8" isAnimationActive={isAnimationActive} />
    <Bar dataKey="previous" fill="#82ca9d" isAnimationActive={isAnimationActive} />
  </BarChart>
);
    
}

export default DashboardRevenueGraph
