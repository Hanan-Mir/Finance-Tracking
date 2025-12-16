import { ResponsivePie, ResponsivePieCanvas } from '@nivo/pie'
import { useTransactionContext } from '../../context/TransactionContext'

function SummaryPieChart () {
   let {cashTransactions,onlineTransactions,cashSales,expenseBalance}=useTransactionContext();
   console.log(typeof expenseBalance)
   let data=[
  {
    "id": "Cash Transactions",
    "label": "Cash",
    "value": cashTransactions,
    "color": "hsl(135, 70%, 50%)"
  },
  {
    "id": "Online Transactions",
    "label": "Online",
    "value": onlineTransactions,
    "color": "hsl(325, 70%, 50%)"
  },
  {
    "id": "Sales Balance",
    "label": "Sales Balance",
    "value": cashSales,
    "color": "hsl(176, 70%, 50%)"
  },
  {
    "id": "Expenses Balance",
    "label": "Expenses Balance",
    "value": expenseBalance,
    "color": "hsl(201, 70%, 50%)"
  },
  
]
   return( <ResponsivePieCanvas
        data={data}
        margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
        innerRadius={0}
        padAngle={0.9}
        
        cornerRadius={2}
        activeOuterRadiusOffset={15}
        arcLinkLabelsSkipAngle={0}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
        
    />)
      }
export default SummaryPieChart