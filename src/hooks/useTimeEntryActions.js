import useDateUtils from "./useDateUtils"
import useCalendarTimeEntries from "./useCalendarTimeEntries"
import useTravels from "./useTravels"

const useTimeEntryActions = () => {
  const { currentMonth, currentYear, time } = useDateUtils()
  const { saveTimeEntry, decrementHoursKm, incremetHoursKm } = useCalendarTimeEntries(currentMonth, currentYear)
  const { addTravel, onEntryEditTravel, deleteTravelByEntry } = useTravels()


  const onSubmit = async (data, date, originalEntry) => {
    const start = time(data.startTime, date)
    const end = time(data.endTime, date)
    // Counting hours between startTime and endTime, abs returns the absolute positive value
    const diffMs = Math.abs(end - start) // This value is in milliseconds
    // Counting hours, there are (1000 * 60 * 60) millisecond in an hour
    const totalHours = (diffMs / (1000 * 60 * 60)).toFixed(2) // Rounding up to two decimals

    // The selected project is a JSON string so we need to parse it
    const selectedProject = JSON.parse(data.project)
    // Replace data.project to hold the project's name
    data.project = selectedProject.name
    // Store the project's ID
    data.projectId = selectedProject.id

    // If editing an existing time entry
    if (data.id) {
      // Calculating if hours or kilometers have changed from original values
      const hoursDiff = totalHours - originalEntry.hours
      const kmDiff = data.kilometers - originalEntry.kilometers
      // Checking if project has been changed for the entry
      const projectChanged = originalEntry.projectId !== data.projectId

      // If project has been changed for the entry
      if (projectChanged) {
        // We have to decrement the hours and kilometers from the original given project
        decrementHoursKm(originalEntry.projectId, originalEntry.hours, originalEntry.kilometers)
        // Then we have to add to the current selected project the entry's totalHours and kilometers
        incremetHoursKm(data.projectId, totalHours, data.kilometers)
        // If project changes and the entry has kilometers, update the travel doc's project as well
        if (data.kilometers > 0) {
          onEntryEditTravel({
            ...data,
            date: start,
            entryId: data.id
          })
        }
        // If project hasn't changed but the hours or the kilometers have
      } else if (hoursDiff !== 0 || kmDiff !== 0) {
        // Let's increment the selected project's hours or kilometers with the difference
        incremetHoursKm(data.projectId, hoursDiff, kmDiff)

        if (kmDiff !== 0) {
          // If data.kilometers in greater than 0, edit travel doc
          if (data.kilometers > 0) {
            onEntryEditTravel({
              ...data,
              date: start,
              entryId: data.id
            })
            // Else delete travel doc since there are no travelled kilometers for the entry anymore
          } else {
            deleteTravelByEntry(data)
          }
        }
      }
      // Update the entry data with the current data
      saveTimeEntry({
        ...data,
        startTime: start,
        endTime: end,
        hours: totalHours,
      })
      // If entry doesn't have id yet, we will create a new document for the entry
    } else {
      const entryId = await saveTimeEntry({
        ...data,
        startTime: start,
        endTime: end,
        hours: totalHours,
      })

      // Increment the selected project's hours and kilometers
      incremetHoursKm(data.projectId, totalHours, data.kilometers)

      // If user enters kilometers for the entry, let's create a document for the kilometers as well
      if (entryId && data.kilometers > 0) {
        addTravel({
          ...data,
          date: start,
          entryId: entryId
        })
      }
    }
  }

  return {
    onSubmit
  }
}

export default useTimeEntryActions