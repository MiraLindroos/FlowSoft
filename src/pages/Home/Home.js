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
      <h3>Kuukauden yhteenveto</h3>
      <div className="statistics">
        <div className="left-side">
          <HoursThisMonth data={data}/>
        </div>
        <div className="right-side">
          <div className="right-side-item">
            <ActiveProjects />
          </div>
          <div className="right-side-item">
            <TravelsThisMonth />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home