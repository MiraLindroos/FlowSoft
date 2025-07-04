import "./Home.css"
import HoursThisMonth from "../../components/Statistics/HoursThisMonth"
import ActiveProjects from "../../components/Statistics/ActiveProjects"
import TravelsThisMonth from "../../components/Statistics/TravelsThisMonth"
import useStatistics from "../../hooks/useStatistics"
import Card from "../../components/Card/Card"

const Home = () => {
  const {
    data
  } = useStatistics();
  return (
    <div className="home">
      <h3 className="home-title">Kuukauden yhteenveto</h3>
      <div className="statistics">
        <div className="statistics hours">
          <Card
            icon={'⌚️'}
            title={'Tunnit'}
            description={'Tarkastele kuukauden tunteja'}
          > <HoursThisMonth data={data}/>
          </Card>
        </div>

        <div className="statistics projects">
          <Card
            icon={'📂'}
            title={'Projektit'}
            description={'Aktiiviset projektit'}
          > <ActiveProjects />
          </Card>
        </div>
        
        <div className="statistics travels">
          <Card
            icon={'🚙'}
            title={'Matkat'}
            description={'Tarkastele kuukauden matkoja'}
          > <TravelsThisMonth />
          </Card>
        </div>

      </div>

    </div>
  );
}

export default Home