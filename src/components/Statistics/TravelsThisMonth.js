import "./Statistics.css";
import { BarChart, Bar, Rectangle, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const TravelsThisMonth = () => {
  const data = [
    {
      name: 'prisma',
      dateRange: '1.–7.6.',
      tunnit: 25,
    },
    {
      name: 'kesko',
      dateRange: '1.–7.6.',
      tunnit: 25,
    },
  ]
  return (
    <div>
      Matkat tässä kuussa
      <ResponsiveContainer width="100%" height={150}>
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 25,
            left: -20,
            bottom: 5,
          }}
        >
          <XAxis dataKey="dateRange" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="tunnit" fill="#013746" activeBar={<Rectangle />}/>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default TravelsThisMonth;
