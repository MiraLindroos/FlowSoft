import "./Statistics.css"
import { BarChart, Bar, Rectangle, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const HoursThisMonth = ({data}) => {

  return (
    <ResponsiveContainer width="100%" height={300}>
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
  )
}

export default HoursThisMonth