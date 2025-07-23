const addProjectFields = [
  {name:"name", label: "Projektin nimi", type: "text", required: true},
  {name:"startDate", label: "Alkamispäivä", type: "date"},
  {name:"endDate", label: "Lopetuspäivä", type: "date"},
  {name:"hourRate", label: "Tuntihinta", type: "number"},
  {name:"fixedRate", label: "Kiinteä hinta", type: "number"},
  {name:"memo", label: "Muistiinpanot", type: "textarea"},
]

export default addProjectFields