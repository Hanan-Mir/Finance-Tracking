import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from "recharts";
const data = [
  {
    name: 'Jan',
    sale: 4000,
  
  },
  {
    name: 'Feb',
    sale: 3000,
   
  },
  {
    name: 'Mar',
    sale: 2000,
    
  },
  {
    name: 'Apr',
    sale: 2780,
  
  },
  {
    name: 'May',
    sale: 1890,
    
  },
  {
    name: 'Jun',
    sale: 2390,
   
  },
  {
    name: 'Jul',
    sale: 3490,
 
  },
  {
    name: 'Aug',
    sale: 3490,
 
  },
  {
    name: 'Sep',
    sale: 3490,
 
  },
  {
    name: 'Oct',
    sale: 3490,
 
  },
  {
    name: 'Nov',
    sale: 3490,
 
  },
  {
    name: 'Dec',
    sale: 2490,
 
  },
];

const SalesGraphMonthly = ({ isAnimationActive = true }) => (
  <BarChart style={{ width: '100%', maxWidth: '700px', maxHeight: '78vh', aspectRatio: 1.618 }} responsive data={data}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="name" />
    <YAxis width="auto" />
    <Tooltip />
    <Legend />
  
    <Bar dataKey="sale" fill="blue" isAnimationActive={isAnimationActive} />
  </BarChart>
);

export default SalesGraphMonthly;