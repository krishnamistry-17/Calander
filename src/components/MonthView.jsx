import React from "react";
import DateCalander from "../pages/Date";

const MonthView = ({ selectedDate, setSelectedDate }) => {
  return (
    <div>
      <DateCalander
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
    </div>
  );
};

export default MonthView;
