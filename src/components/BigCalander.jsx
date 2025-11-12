import React, { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import enUS from "date-fns/locale/en-US";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 0 }),
  getDay,
  locales,
});

const events = [
  {
    title: "Team Meeting",
    start: new Date(2025, 10, 12, 10, 0),
    end: new Date(2025, 10, 12, 11, 0),
  },
  {
    title: "Lunch with Sarah",
    start: new Date(2025, 10, 13, 12, 0),
    end: new Date(2025, 10, 13, 13, 0),
  },
];

const BigCalendar = () => {
  const [view, setView] = useState("week");

  return (
    <div style={{ height: "90vh", margin: "50px" }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 700 }}
        defaultView={view}
        onView={(view) => setView(view)}
      />
    </div>
  );
};

export default BigCalendar;
