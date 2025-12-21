import ReactApexChart from 'react-apexcharts';
import Chart from 'react-apexcharts'
import { useLoaderData } from 'react-router-dom';
function StockChart() {
  const {stockHealth}=useLoaderData()
    let chartOptions = {
    chart: {
      type: "radialBar",
      
    },
    series: [stockHealth],
    plotOptions: {
        radialBar: {
            hollow: {
                margin: 15,
                size: "60%"
            },
            dataLabels:{
            value:{
                fontSize:'2rem',
                
            }
        }
        }
    },
    stroke: { lineCap: "round" },
    labels: ["Stock Health"]
  };
    return (
        <ReactApexChart 
      options={chartOptions} 
      series={chartOptions.series} 
      type="radialBar"  
    />
    )
}

export default StockChart

