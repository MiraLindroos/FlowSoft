import "./Statistics.css";
import { PieChart, ResponsiveContainer, Pie } from 'recharts'
import useProjects from "../../hooks/useProjects"

const ActiveProjects = () => {
  const { activeProjects } = useProjects()
  return (
    <ResponsiveContainer width="100%" height={150}>
      <PieChart margin={{top: 15}}>
        <Pie
          data={activeProjects}
          dataKey="value"
          outerRadius={50}
          fill="#014639"
          label={({ name, value }) => `${name}: ${value}h`}
          labelLine={false}
        />
      </PieChart>
    </ResponsiveContainer>
  )
}

export default ActiveProjects;