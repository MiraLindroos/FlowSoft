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
            style={{ backgroundColor: "#e0f0f3", borderLeft: "4px solid #013746"}}
          > <HoursThisMonth data={data}/>
          </Card>
        </div>

        <div className="statistics projects">
          <Card
            icon={'📂'}
            title={'Projektit'}
            description={'Aktiiviset projektit'}
            style={{ backgroundColor: "#e0f3e6", borderLeft: "4px solid #014639"}}
          > <ActiveProjects />
          </Card>
        </div>
        
        <div className="statistics travels">
          <Card
            icon={'🚙'}
            title={'Matkat'}
            description={'Tarkastele kuukauden matkoja'}
            style={{ backgroundColor: "#e8e0f3", borderLeft: "4px solid #1a0146"}}
          > <TravelsThisMonth />
          </Card>
        </div>

      </div>

    </div>
  );
}

export default Home