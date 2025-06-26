import "./Home.css"
import HoursThisMonth from "../../components/Statistics/HoursThisMonth.js"
import ActiveProjects from "../../components/Statistics/ActiveProjects.js"
import TravelsThisMonth from "../../components/Statistics/TravelsThisMonth.js"
import useStatistics from "../../hooks/useStatistics.js"

const Home = () => {
  const {
    data
  } = useStatistics();
  return (
    <div className="home">
      <div className="left-side">
        <HoursThisMonth data={data}/>
      </div>
      <div className="right-side">
        <ActiveProjects />
        <TravelsThisMonth />
      </div>
    </div>
  );
}

export default Home