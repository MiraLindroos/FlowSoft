const useProjectsList = () => {
  const projects = [
    {name: "prisma", id: 1, price: 20},
    {name: "sokos", id: 2, price: 34},
    {name: "kesko", id: 3, price: 12},
    {name: "gogo", id: 4, price: 43},
    {name: "hook", id: 5, price: 24},
  ]
  return {
    projects
  }
}

export default useProjectsList;