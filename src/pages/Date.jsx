import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import Header from "./Header";
import DayView from "../components/DayView";
import WeekView from "../components/WeekView";
import { supabase } from "../lib/supabase.client";
import { toast } from "react-toastify";
import { IoClose } from "react-icons/io5";
import { useModal } from "../context/ModelContext";

const DateCalander = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [colorTag, setColorTag] = useState("#4f46e5");
  const [reminder, setReminder] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [eventData, setEventData] = useState([]);
  const [editEvent, setEditEvent] = useState(null);
  const [currentView, setCurrentView] = useState("month");

  const { openModel, setOpenModel } = useModal();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const { data, error } = await supabase.from("details").select("*");
    if (error) {
      console.log("Fetch Error:", error);
      toast.error("Failed to load events");
      return;
    }
    setEventData(data);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setOpenModel(true);
    setEditEvent(null);
    setTitle("");
    setDescription("");
    setStartTime("");
    setEndTime("");
    setColorTag("#4f46e5");
    setReminder(false);
  };

  const handleSavedData = async () => {
    const { data, error } = await supabase
      .from("details")
      .insert({
        title,
        description,
        startTime,
        endTime,
        colorTag,
        reminder,
        selectedDate: selectedDate?.toLocaleDateString("en-CA"),
      })
      .select();

    if (error) {
      console.log("Insert Error:", error);
      toast.error("Failed to save data");
      return;
    }
    setEventData([...eventData, ...data]);
    // setEditEvent(data[0]);
    setOpenModel(false);
    toast.success("Data saved successfully");
  };

  const handleEdit = async () => {
    const { data, error } = await supabase
      .from("details")
      .update({
        title,
        description,
        startTime,
        endTime,
        colorTag,
        reminder,
        selectedDate: selectedDate?.toLocaleDateString("en-CA"),
      })
      .eq("id", editEvent?.id)
      .select();

    if (error) {
      console.log("Update Error:", error);
      toast.error("Failed to update event");
      return;
    }

    const updatedEvent = data[0];
    console.log("updatedEvent", updatedEvent);

    setEventData((prev) =>
      prev.map((event) =>
        Number(event.id) === Number(editEvent.id) ? updatedEvent : event
      )
    );
    setEditEvent(null);
    setOpenModel(false);
    toast.success("Event updated successfully");
  };

  const handleDelete = async () => {
    if (!editEvent?.id) {
      toast.error("No event selected for deletion");
      return;
    }

    const { error } = await supabase
      .from("details")
      .delete()
      .eq("id", editEvent.id);

    if (error) {
      console.log("Delete Error:", error);
      toast.error("Failed to delete event");
      return;
    }
    setEventData((prev) =>
      prev.filter((event) => Number(event.id) !== Number(editEvent.id))
    );
    setEditEvent(null);
    setOpenModel(false);
    toast.success("Event deleted successfully");
  };

  const openEditModal = (event) => {
    setEditEvent(event);
    setTitle(event.title);
    setDescription(event.description);
    setStartTime(event.startTime);
    setEndTime(event.endTime);
    setColorTag(event.colorTag);
    setReminder(event.reminder);
    setSelectedDate(new Date(event.selectedDate));
    setOpenModel(true);
  };

  return (
    <div className=" z-0">
      <div className="  bg-white flex flex-col p-4">
        <Header activeView={currentView} onChangeView={setCurrentView} />
        <div className="w-full flex-1">
          {currentView === "day" && (
            <DayView
              date={selectedDate || new Date()}
              events={eventData}
              view={currentView === "day" ? "day" : "week"}
              onEventClick={openEditModal}
            />
          )}
          {currentView === "week" && (
            <WeekView
              date={selectedDate || new Date()}
              events={eventData}
              onEventClick={openEditModal}
            />
          )}
          {(currentView === "month" || currentView === "year") && (
            <Calendar
              key={`${currentView}-${eventData.length}`}
              view={currentView === "year" ? "year" : "month"}
              value={selectedDate}
              onChange={setSelectedDate}
              className="w-full h-full p-4 rounded-md my-4"
              onClickDay={handleDateChange}
              tileContent={({ date, view }) => {
                if (view === "month") {
                  const eventsForDay = eventData.filter(
                    (event) =>
                      new Date(event.selectedDate).toDateString() ===
                      date.toDateString()
                  );
                  return eventsForDay.length > 0 ? (
                    <div className="flex flex-col mt-1">
                      {eventsForDay.map((event, idx) => (
                        <div
                          key={idx}
                          onClick={(e) => {
                            e.stopPropagation();
                            openEditModal(event);
                          }}
                          className="cursor-pointer"
                        >
                          <span
                            className="h-2 w-2 rounded-full mb-1"
                            style={{ backgroundColor: event.colorTag }}
                          ></span>
                          <p className="text-xs cursor-pointer hover:underline">
                            <span
                              className={` w-full py-1 px-2 rounded-md`}
                              style={{ backgroundColor: event.colorTag }}
                            >
                              {event.title}
                            </span>
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : null;
                }
              }}
            />
          )}
        </div>
      </div>

      {openModel && selectedDate && (
        <div className=" fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className=" absolute inset-0 bg-black/40 backdrop:blur-[1px]"
            onClick={() => setOpenModel(false)}
          ></div>
          <div className=" relative w-full max-w-lg bg-white rounded-xl shadow-2xl  ring-back/5">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (editEvent) {
                  handleEdit();
                } else {
                  handleSavedData();
                }
              }}
              className="w-full p-6"
            >
              <div className=" flex items-start justify-between">
                <div className="flex flex-1 flex-col">
                  <label className="text-sm font-medium text-gray-700">
                    Title
                  </label>
                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    type="text"
                    placeholder="Title"
                    className="mt-1 w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-0"
                  />
                </div>
                <IoClose
                  className=" cursor-pointer text-xl"
                  onClick={() => setOpenModel(false)}
                  aria-label="Close"
                />
              </div>

              <div className=" flex flex-col mt-4">
                <label className="text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  value={description}
                  rows={4}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Description"
                  className="mt-1 w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-0"
                ></textarea>
              </div>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className=" flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-700">
                    Start Time
                  </label>
                  <input
                    type="time"
                    className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-0"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                  />
                </div>
                <div className=" flex flex-col gap-2 ">
                  <label className="text-sm font-medium text-gray-700">
                    End Time
                  </label>
                  <input
                    type="time"
                    className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-0"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                  />
                </div>
              </div>
              <div className="mt-4">
                <label className="text-sm font-medium text-gray-700">
                  Color Tag
                </label>
                <div className="flex items-center gap-2 mt-1">
                  <input
                    type="color"
                    className="w-28 h-10 p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-0"
                    value={colorTag}
                    onChange={(e) => setColorTag(e.target.value)}
                  />
                  <span
                    className="h-3 w-3 rounded-full inline-block"
                    style={{ backgroundColor: colorTag }}
                  ></span>
                </div>
              </div>

              <div className=" mt-4 flex items-center gap-2">
                <input
                  id="reminder"
                  type="checkbox"
                  checked={reminder}
                  onChange={(e) => setReminder(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="reminder" className="text-sm text-gray-700">
                  Reminder
                </label>
              </div>

              <div className=" grid sm:grid-cols-2 grid-cols-1 mt-4 gap-2">
                {!editEvent ? (
                  <button
                    className="bg-green-600 text-white w-full p-2 rounded-sm "
                    type="submit"
                  >
                    Save
                  </button>
                ) : (
                  <>
                    <button
                      className="bg-yellow-600 text-white w-full p-2 rounded-sm "
                      type="submit"
                    >
                      Update
                    </button>
                    <button
                      className="bg-red-600 text-white w-full p-2 rounded-sm "
                      type="button"
                      onClick={handleDelete}
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateCalander;
