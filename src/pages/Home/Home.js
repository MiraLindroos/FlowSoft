import "./Home.css"
import HoursThisMonth from "../../components/Statistics/HoursThisMonth"
import ActiveProjects from "../../components/Statistics/ActiveProjects"
import TravelsThisMonth from "../../components/Statistics/TravelsThisMonth"
import useStatistics from "../../hooks/useStatistics"

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