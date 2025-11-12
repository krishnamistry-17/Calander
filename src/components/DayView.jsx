import Calendar from "react-calendar";

const DayView = ({ date, view, events = [], onEventClick = () => {} }) => {
  const dayKey = new Date(date).toDateString();

  const eventsForDay = events.filter(
    (e) => new Date(e.selectedDate).toDateString() === dayKey
  );
  return (
    // <div className="  my-5">
    //   <h2 className="text-[27px] font-semibold ">
    //     {new Date(date).toLocaleDateString()}
    //   </h2>
    //   <p className="text-[18px] font-regular">
    //     {new Date(date).toLocaleDateString("en-US", { weekday: "long" })}
    //   </p>
    //   {eventsForDay.length === 0 ? (
    //     <p>No events for this day.</p>
    //   ) : (
    //     <div>
    //       {eventsForDay.map((item, index) => {
    //         return (
    //           <div className="flex" key={index}>
    //             <div className=" flex-1/2 border border-gray-200 rounded-md p-2">
    //               <div>
    //                 <div className="font-medium">{item.title}</div>
    //                 <div className="text-sm text-gray-600">
    //                   {item.startTime || "--"} - {item.endTime || "--"}
    //                 </div>
    //                 {item.description ? (
    //                   <div className="text-sm text-gray-700 mt-1">
    //                     {item.description}
    //                   </div>
    //                 ) : null}
    //               </div>
    //               <button
    //                 className="text-blue-600 text-sm"
    //                 onClick={() => onEventClick(item || null)}
    //               >
    //                 Edit
    //               </button>
    //             </div>
    //             <div className=" flex-1/2 ">
    //               <Calendar />
    //               <div>
    //                 <h2>New Evenets</h2>
    //               </div>
    //             </div>
    //           </div>
    //         );
    //       })}
    //     </div>
    //   )}
    // </div>

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
        <ul className="space-y-2">
          {eventsForDay.map((e) => (
            <li
              key={e.id}
              className="flex items-start justify-between rounded-md border border-gray-200 p-3 max-w-md"
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
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DayView;
