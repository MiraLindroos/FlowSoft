import "./Statistics.css";
import { CartesianGrid, LineChart, XAxis, YAxis, Tooltip, Legend, Line, ResponsiveContainer } from 'recharts'

const TravelsThisMonth = () => {
  const data = [
    {
      name: 'ma',
      dateRange: '1.–7.6.',
      tunnit: 30,
      raha: 40,
    },
    {
      name: 'ti',
      dateRange: '1.–7.6.',
      tunnit: 65,
      raha: 90,
    },
        {
      name: 'ke',
      dateRange: '1.–7.6.',
      tunnit: 23,
      raha: 32,
    },
    {
      name: 'to',
      dateRange: '1.–7.6.',
      tunnit: 53,
      raha:79,
    },
  ]
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
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="tunnit" stroke="#013746" />
        <Line type="monotone" dataKey="raha" stroke="#1a0146" />
      </LineChart>
    </ResponsiveContainer>

  )
}

export default TravelsThisMonth;
