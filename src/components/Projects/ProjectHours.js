import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from  "react-datepicker";
import { fi } from 'date-fns/locale';

const ProjectHours = ({start, end, onChange}) => {
  registerLocale('fi', fi)

  return (
    <div className="project-daterange">
      <DatePicker
        selected={start}
        onChange={onChange}
        startDate={start}
        endDate={end}
        selectsRange
        rangeSeparator=" - "
        locale='fi'
      />
    </div>
  )
}

export default ProjectHours