import "./Home.css"
import HoursThisMonth from "../../components/Statistics/HoursThisMonth"
import ActiveProjects from "../../components/Statistics/ActiveProjects"
import TravelsThisMonth from "../../components/Statistics/TravelsThisMonth"
import useStatistics from "../../hooks/useStatistics"
import Card from "../../components/Card/Card"

const Home = () => {
  const { weekHours, monthTravels } = useStatistics();

  return (
    <div className="home">
      <h3>Kuukauden yhteenveto</h3>
      <div className="statistics">
        <div className="statistics hours">
          {/* Card for displaying bar chart for this month's added hours */}
          <Card
            icon={'⌚️'}
            title={'Tunnit'}
            description={'Tarkastele kuukauden tunteja'}
            variant="blue"
          > <HoursThisMonth data={weekHours} />
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
            description={'Tarkastele kuluvan kuukauden matkoja'}
            variant="purple"
          > <TravelsThisMonth data={monthTravels} />
          </Card>
        </div>

      </div>

    </div>
  );
}

export default Home