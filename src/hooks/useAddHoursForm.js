import useProjectsList from "./useProjectsList"

const useAddHoursForm = () => {
  const { activeProjects } = useProjectsList()

  const addHoursFields = [
    {name:"startTime", label: "Aloitusaika", type: "time"},
    {name:"endTime", label: "Lopetusaika", type: "time"},
    {name:"project", label: "Projekti", type: "select", options: activeProjects},
    {name:"travel", label: "Kilometrit", type: "number"},
    {name:"hourRate", label: "Tuntihinta", type: "number"},
    {name:"memo", label: "Muistiinpanot", type: "textarea"},
  ]

  return {
    addHoursFields
  }
}

export default useAddHoursForm