import ReactApexChart from 'react-apexcharts';
import Chart from 'react-apexcharts'
function StockChart() {
    let chartOptions = {
    chart: {
      type: "radialBar",
      
    },
    series: [79],
    plotOptions: {
        radialBar: {
            hollow: {
                margin: 15,
                size: "70%"
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
      height={280} 
    />
    )
}

export default StockChart

