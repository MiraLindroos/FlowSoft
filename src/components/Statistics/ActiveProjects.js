import "./Statistics.css";
import { PieChart, ResponsiveContainer, Pie } from 'recharts'
import useProjectsList from "../../hooks/useProjectsList"

const ActiveProjects = () => {
  const { projects } = useProjectsList()
  // Let's filter out all projects that have onGoing=false
  const activeProjects = projects
    .filter((p) => p.onGoing)
    .map((p) => ({name: p.name, value: p.hours}))
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