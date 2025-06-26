import "./Statistics.css";
import { BarChart, Bar, Rectangle, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const HoursThisMonth = ({data}) => {

  return (
    <div className="hours">
      tunnit
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 0,
            bottom: 5,
          }}
        >
          <XAxis dataKey="dateRange" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="tunnit" fill="#013746" activeBar={<Rectangle />} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default HoursThisMonth;