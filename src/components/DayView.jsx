import Calendar from "react-calendar";

const DayView = ({
  date,
  onOpenAdd = () => {},
  events = [],
  onEventClick = () => {},
}) => {
  const dayKey = new Date(date).toDateString();

  const eventsForDay = events.filter(
    (e) => new Date(e.selectedDate).toDateString() === dayKey
  );

  const handleModal = () => {
    onOpenAdd();
  };

  return (
    <div className="w-full h-full p-4">
      <div className="my-4">
        <h2 className="text-2xl font-semibold">
          {new Date(date).toLocaleDateString()}
        </h2>
        <p className="text-[18px] font-regular">
          {new Date(date).toLocaleDateString("en-US", { weekday: "long" })}
        </p>
      </div>
      <div className="grid sm:grid-cols-2 grid-cols-1 gap-4">
        <div className="space-y-2">
          {eventsForDay.length === 0 ? (
            <p >No events for this day.</p>
          ) : (
            eventsForDay.map((e) => (
              <div
                key={e.id}
                className="flex items-start justify-between rounded-md border border-gray-200 p-3 h-fit"
                style={{ borderLeft: `4px solid ${e.colorTag}` }}
              >
                <div className="pr-4">
                  <div className="font-medium">{e.title}</div>
                  <div className="text-sm">
                    {e.startTime || "--"} - {e.endTime || "--"}
                  </div>
                  {e.description ? (
                    <div className="text-sm  mt-1">
                      {e.description}
                    </div>
                  ) : null}
                </div>
                <button
                  className="text-blue-600 text-sm"
                  onClick={() => onEventClick(e)}
                >
                  Edit
                </button>
              </div>
            ))
          )}
        </div>
        <div>
          <Calendar onClickDay={handleModal} value={new Date(date)} />
        </div>
      </div>
    </div>
  );
};

export default DayView;
