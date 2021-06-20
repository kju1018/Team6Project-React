import { useState } from "react";
import ReactDatePicker from "react-datepicker";

function Calendar(props) {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <ReactDatePicker
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      inline
      
    />
  );
};

export default Calendar;