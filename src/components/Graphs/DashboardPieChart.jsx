import { ResponsivePie } from "@nivo/pie";

export default function DashboardPieChart() {
   const data= [
  {
    "id": "erlang",
    "label": "erlang",
    "value": 21,
    "color": "hsl(306, 70%, 50%)"
  },
  {
    "id": "ruby",
    "label": "ruby",
    "value": 124,
    "color": "hsl(10, 70%, 50%)"
  },
  {
    "id": "make",
    "label": "make",
    "value": 207,
    "color": "hsl(86, 70%, 50%)"
  },
  {
    "id": "php",
    "label": "php",
    "value": 68,
    "color": "hsl(21, 70%, 50%)"
  },
  {
    "id": "haskell",
    "label": "haskell",
    "value": 327,
    "color": "hsl(123, 70%, 50%)"
  }
]
return (
    <ResponsivePie /* or Pie for fixed dimensions */
        data={data}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={0.6}
        cornerRadius={2}
        activeOuterRadiusOffset={8}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
        legends={[
            {
                anchor: 'bottom',
                direction: 'row',
                translateY: 56,
                itemWidth: 100,
                itemHeight: 18,
                symbolShape: 'circle'
            }
        ]}
    />
)

  
}
