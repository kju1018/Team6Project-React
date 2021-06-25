import { useState } from "react";
import DatePicker from "react-datepicker";
import "./datepickerHome.css";

function Calendar(props) {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <DatePicker
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      monthsShown={2}
      inline
      
    />
  );
};

export default Calendar;