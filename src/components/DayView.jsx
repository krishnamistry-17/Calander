import Calendar from "react-calendar";
import { useModal } from "../context/ModelContext";

const DayView = ({ date, view, events = [], onEventClick = () => {} }) => {
  const dayKey = new Date(date).toDateString();
  const { openModel, setOpenModel } = useModal();

  const eventsForDay = events.filter(
    (e) => new Date(e.selectedDate).toDateString() === dayKey
  );

  const handleModal = (date) => {
    setOpenModel(true);
  };
  console.log(openModel);
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
      {eventsForDay.length === 0 ? (
        <p className="text-gray-500">No events for this day.</p>
      ) : (
        <div className="space-y-2">
          {eventsForDay.map((e) => (
            <div key={e.id} className=" grid sm:grid-cols-2 grid-cols-1 gap-2">
              <div
                className="flex items-start justify-between rounded-md border border-gray-200 p-3 max-w-md h-fit"
                style={{ borderLeft: `4px solid ${e.colorTag}` }}
              >
                <div className="pr-4">
                  <div className="font-medium">{e.title}</div>
                  <div className="text-sm text-gray-600">
                    {e.startTime || "--"} - {e.endTime || "--"}
                  </div>
                  {e.description ? (
                    <div className="text-sm text-gray-700 mt-1">
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
              <div>
                <Calendar onClickDay={handleModal} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DayView;
