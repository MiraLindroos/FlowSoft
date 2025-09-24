import "./Statistics.css";
import { BarChart, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Bar } from 'recharts'

const TravelsThisMonth = ({data}) => {
  return (
    data[0].km > 0 ? <ResponsiveContainer width="100%" height="100%" minHeight={200} >
      <BarChart
        data={data}
        margin={{
          right: 20,
          left: -20,
          bottom: 5,
        }}
      >
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="km" fill="#280e54" />
        <Bar dataKey="raha" fill="#6d5391" />
      </BarChart>
    </ResponsiveContainer>
    : <div className="no-travels">Ei matkoja tässä kuussa!</div>
  )
}

export default TravelsThisMonth;
