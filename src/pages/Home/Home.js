import "./Home.css"
import HoursThisMonth from "../../components/Statistics/HoursThisMonth"
import ActiveProjects from "../../components/Statistics/ActiveProjects"
import TravelsThisMonth from "../../components/Statistics/TravelsThisMonth"
import useStatistics from "../../hooks/useStatistics"
import Card from "../../components/Card/Card"
import cardColors from "../../theme/cardColors"

const Home = () => {
  const {
    data
  } = useStatistics();
  return (
    <div className="home">
      <h3>Kuukauden yhteenveto</h3>
      <div className="statistics">
        <div className="statistics hours">
          <Card
            icon={'⌚️'}
            title={'Tunnit'}
            description={'Tarkastele kuukauden tunteja'}
            variant="blue"
          > <HoursThisMonth data={data}/>
          </Card>
        </div>

        <div className="statistics projects">
          <Card
            icon={'📂'}
            title={'Projektit'}
            description={'Aktiiviset projektit'}
            variant="green"
          > <ActiveProjects />
          </Card>
        </div>
        
        <div className="statistics travels">
          <Card
            icon={'🚙'}
            title={'Matkat'}
            description={'Tarkastele kuukauden matkoja'}
            variant="purple"
          > <TravelsThisMonth />
          </Card>
        </div>

      </div>

    </div>
  );
}

export default Home