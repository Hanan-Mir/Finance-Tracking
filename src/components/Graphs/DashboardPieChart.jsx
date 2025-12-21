import { ResponsivePie } from "@nivo/pie";
import { useLoaderData } from "react-router-dom";

export default function DashboardPieChart() {
  const {totalSales,totalRevenue,totalExpenses,totalSalesBalanceSum}=useLoaderData()
   const data= [
  {
    "id": "Sales",
    "value": totalSales,
    "color": "hsl(306, 70%, 50%)"
  },
  {
    "id": "Expenses",
    
    "value": totalExpenses,
    "color": "#05173d"
  },
  {
    "id": "Revenue",
    "value":totalRevenue,
    "color": "hsl(86, 70%, 50%)"
  },
  {
    "id":'Sales Balance',
    'value':totalSalesBalanceSum,
    "color":'#c0ff33'
  }
 
]
return (
    <ResponsivePie /* or Pie for fixed dimensions */
        data={data}
        colors={{datum:'data.color'}}
        margin={{ top: 20, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={0.6}
        cornerRadius={2}
        activeOuterRadiusOffset={8}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#804a4a"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor='#cea2a2'
       
    />
)

  
}
