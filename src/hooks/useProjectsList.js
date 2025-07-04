const useProjectsList = () => {
  const projects = [
    {name: "prisma", id: 1, price: 20, path: "/Prisma"},
    {name: "sokos", id: 2, price: 34, path: "/Matkat"},
    {name: "kesko", id: 3, price: 12, path: "/Ajanhallinta"},
    {name: "gogo", id: 4, price: 43, path: "/Profiili"},
    {name: "hook", id: 5, price: 24, path: "/Asetukset"},
    {name: "timma", id: 6, price: 44, path: "/Etusivu"},
    {name: "lidl", id: 7, price: 14, path: "/Matkat"},
  ]

  return {
    projects
  }
}

export default useProjectsList