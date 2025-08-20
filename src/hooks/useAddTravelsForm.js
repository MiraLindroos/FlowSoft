import useProjects from "./useProjects"

const useAddTravelsForm = () => {
  // We need activeProjects so we can show them as options
  const { activeProjects } = useProjects()

  const addTravelFields = [
    {name:"date", label: "Päivä", type: "date", required: true},
    {name:"project", label: "Projekti", type: "select", options: activeProjects, required: true},
    {name:"from", label: "Mistä", type: "text"},
    {name:"to", label: "Mihin", type: "text"},
    {name:"km", label: "Kilometrit", type: "number", required: true},
    {name:"travelRate", label: "Kilometrihinta", type: "number"},
    {name:"memo", label: "Muistiinpanot", type: "textarea"},
  ]
  return {
    addTravelFields
  }
}

export default useAddTravelsForm