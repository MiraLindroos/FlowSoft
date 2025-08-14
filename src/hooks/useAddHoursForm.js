import useProjects from "./useProjects"

const useAddHoursForm = () => {
  // We need activeProjects so we can show them as options
  const { activeProjects } = useProjects()

  // Fields for add + edit hours form
  const addHoursFields = [
    {name:"startTime", label: "Aloitusaika", type: "time", required: true},
    {name:"endTime", label: "Lopetusaika", type: "time", required: true},
    {name:"project", label: "Projekti", type: "select", options: activeProjects, required: true},
    {name:"travels", label: "Kilometrit", type: "number"},
    {name:"travelRate", label: "Kilometrihinta", type: "number"},
    {name:"memo", label: "Muistiinpanot", type: "textarea"}
  ]

  return {
    addHoursFields
  }
}

export default useAddHoursForm