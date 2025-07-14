import useProjectsList from "./useProjectsList"

const useAddHoursForm = () => {
  // We need activeProjects so we can show them as options
  const { activeProjects } = useProjectsList()

  // Fields for add hours form
  const addHoursFields = [
    {name:"startTime", label: "Aloitusaika", type: "time", required: true},
    {name:"endTime", label: "Lopetusaika", type: "time", required: true},
    {name:"project", label: "Projekti", type: "select", options: activeProjects, required: true},
    {name:"travel", label: "Kilometrit", type: "number"},
    {name:"hourRate", label: "Tuntihinta", type: "number"},
    {name:"memo", label: "Muistiinpanot", type: "textarea"},
  ]

  return {
    addHoursFields
  }
}

export default useAddHoursForm