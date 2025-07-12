import useProjectsList from "./useProjectsList"

const useAddHoursForm = () => {
  const { activeProjects } = useProjectsList()

  const addHoursFields = [
    {name:"startTime", label: "Aloitusaika", type: "time", value: ""},
    {name:"endTime", label: "Lopetusaika", type: "time", value: ""},
    {name:"project", label: "Projekti", type: "select", options: activeProjects, value: ""},
    {name:"travel", label: "Kilometrit", type: "number", value: ""},
    {name:"hourRate", label: "Tuntihinta", type: "number", value: ""},
    {name:"memo", label: "Muistiinpanot", type: "textarea", value: ""},
  ]

  return {
    addHoursFields
  }
}

export default useAddHoursForm