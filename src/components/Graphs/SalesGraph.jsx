import { useLoaderData } from "react-router-dom";
import { Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";


function SalesGraph ({ isAnimationActive = true }) {
  const {weeklySalesData}=useLoaderData();
  return (<AreaChart
    style={{ width: '100%', maxWidth: '700px', maxHeight: '70vh', aspectRatio: 1.618 }}
    responsive
    data={weeklySalesData}
    margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
  >
    <defs>
      <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
        <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
      </linearGradient>
      <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
        <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
      </linearGradient>
    </defs>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="name" />
    <YAxis width="auto" />
    <Tooltip />
    <Area
      type="monotone"
      dataKey="uv"
      stroke="#8884d8"
      fillOpacity={1}
      fill="url(#colorUv)"
      isAnimationActive={isAnimationActive}
    />
    
  </AreaChart>)
;
}
export default SalesGraph;