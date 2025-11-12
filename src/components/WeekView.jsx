import React from "react";

function startOfWeek(date) {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day;
  return new Date(d.setDate(diff));
}

const WeekView = ({ date, events = [], onEventClick = () => {} }) => {
  const start = startOfWeek(date || new Date());
  const days = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    return d;
  });

  const eventsByDay = (day) =>
    events.filter(
      (e) => new Date(e.selectedDate).toDateString() === day.toDateString()
    );

  return (
    <div >
      <div className="my-4 flex items-center gap-1 px-4">
        <p className="text-[22px] font-semibold">
          {new Date(date).toLocaleDateString("en-US", { month: "long" })}
        </p>
        <p className="text-[22px] font-regular">
          {new Date(date).toLocaleDateString("en-US", { year: "numeric" })}
        </p>
      </div>
      <div className="w-full h-full p-4 grid  md:grid-cols-5  grid-cols-1 gap-2">
        {days.map((d) => (
          <div
            key={d.toISOString()}
            className="border border-gray-200 rounded-md p-2 flex flex-col"
          >
            <div className="text-sm font-medium mb-2">
              {d.toLocaleDateString(undefined, {
                weekday: "short",
                month: "short",
                day: "numeric",
              })}
            </div>
            <div className="space-y-2">
              {eventsByDay(d).length === 0 ? (
                <div className="text-xs text-gray-400">No events</div>
              ) : (
                eventsByDay(d).map((e) => (
                  <div
                    key={e.id}
                    className="text-xs rounded px-2 py-1 cursor-pointer"
                    style={{ backgroundColor: e.colorTag, color: "#fff" }}
                    onClick={() => onEventClick(e)}
                  >
                    {e.title}
                    {e.startTime ? ` • ${e.startTime}` : ""}
                  </div>
                ))
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeekView;
