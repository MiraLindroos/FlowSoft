import "./Home.css"
import HoursThisMonth from "../../components/Statistics/HoursThisMonth"
import ActiveProjects from "../../components/Statistics/ActiveProjects"
import TravelsThisMonth from "../../components/Statistics/TravelsThisMonth"
import useStatistics from "../../hooks/useStatistics"
import StatisticsCard from "../../components/Statistics/StatisticsCard"

const Home = () => {
  const {
    data
  } = useStatistics();
  return (
    <div className="home">
      <h3 className="home-title">Kuukauden yhteenveto</h3>
      {/* <div className="statistics">
        <div className="statistics-card a">
          <HoursThisMonth data={data}/>
        </div>
        <div className="statistics-card b">
          <ActiveProjects />
        </div>
        <div className="statistics-card c">
          <TravelsThisMonth />
        </div>
      </div> */}
      <div className="statistics">
        <StatisticsCard
          icon={'⌚️'}
          title={'Tunnit'}
          description={'Kuukauden tunnit'}
        > <HoursThisMonth data={data}/>
        </StatisticsCard>

        <StatisticsCard
          icon={'📂'}
          title={'Projektit'}
          description={'Avoimet projektit'}
        > <ActiveProjects />
        </StatisticsCard>

        <StatisticsCard
          icon={'🚙'}
          title={'Matkat'}
          description={'Kuukauden matkat'}
        > <TravelsThisMonth />
        </StatisticsCard>
      </div>

    </div>
  );
}

export default Home