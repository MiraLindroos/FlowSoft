import "./Statistics.css";
import { CartesianGrid, LineChart, XAxis, YAxis, Tooltip, Legend, Line, ResponsiveContainer } from 'recharts'

const TravelsThisMonth = ({data}) => {
  return (
    <ResponsiveContainer width="100%" height="100%" minHeight={200} >
      <LineChart
        data={data}
        margin={{
          right: 20,
          left: -20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="5" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="km" stroke="#013746" />
      </LineChart>
    </ResponsiveContainer>

  )
}

export default TravelsThisMonth;
