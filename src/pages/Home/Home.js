import "./Home.css"
import HoursThisMonth from "../../components/Statistics/HoursThisMonth.js"
import ActiveProjects from "../../components/Statistics/ActiveProjects.js"
import TravelsThisMonth from "../../components/Statistics/TravelsThisMonth.js"

const Home = () => {
  return (
    <div className="home">
      <div className="left-side">
        <HoursThisMonth />
      </div>
      <div className="right-side">
        <ActiveProjects />
        <TravelsThisMonth />
      </div>
    </div>
  );
}

export default Home