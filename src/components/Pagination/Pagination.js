import Button from "../Button/Button"

const Pagination = ({page, setPage}) => {
  // Handler for the previous button
  const handlePrev = () => {
    setPage(page-1)
  }
  // Handler for the next button
  const handleNext = () => {
    setPage(page+1)
  }

  return (
    <div>
      <Button title={'<'} onClick={handlePrev} disabled={page <= 1}/>
      <Button title={page} />
      <Button title={'>'} onClick={handleNext}/>
    </div>
  )
}

export default Pagination