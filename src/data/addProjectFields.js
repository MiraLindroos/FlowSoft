const addProjectFields = [
  {name:"name", label: "Projektin nimi", type: "text", required: true},
  {name:"startDate", label: "Alkamispäivä", type: "date"},
  {name:"endDate", label: "Lopetuspäivä", type: "date"},
  {name:"hourRate", label: "Tuntihinta", type: "number"},
  {name:"fixedRate", label: "Kiinteä hinta", type: "number"},
  {name:"contact", label: "Yhteyshenkilö", type: "text"},
  {name:"reference", label: "Viitenumero", type: "number"},
  {name:"operator", label: "Operaattori", type: "text"},
  {name:"memo", label: "Muistiinpanot", type: "textarea"},
  {name: "file", label: "Lisää liitteitä", type: "file"},
  {name: "onGoing", label: "Projekti käynnissä?", type: "checkbox"},
]

export default addProjectFields