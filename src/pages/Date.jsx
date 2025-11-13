import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import Header from "./Header";
import DayView from "../components/DayView";
import WeekView from "../components/WeekView";
import { toast } from "react-toastify";
import { useModal } from "../context/ModelContext";
import EventModal from "../components/EventModal";
import { useEvents } from "../hooks/useEvents";

const DateCalander = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [editEvent, setEditEvent] = useState(null);
  const [currentView, setCurrentView] = useState("month");

  const { openModel, setOpenModel } = useModal();
  const { events, fetchEvents, createEvent, updateEvent, deleteEvent } =
    useEvents();

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setOpenModel(true);
    setEditEvent(null);
  };

  const handleCreate = async (payload) => {
    try {
      await createEvent({ ...payload, selectedDate });
      setOpenModel(false);
      toast.success("Data saved successfully");
    } catch (e) {
      console.log("Insert Error:", e);
      toast.error("Failed to save data");
    }
  };

  const handleUpdate = async (payload) => {
    try {
      await updateEvent(editEvent.id, { ...payload, selectedDate });
      setEditEvent(null);
      setOpenModel(false);
      toast.success("Event updated successfully");
    } catch (e) {
      console.log("Update Error:", e);
      toast.error("Failed to update event");
    }
  };

  const handleDelete = async () => {
    try {
      if (!editEvent?.id) {
        toast.error("No event selected for deletion");
        return;
      }
      await deleteEvent(editEvent.id);
      setEditEvent(null);
      setOpenModel(false);
      toast.success("Event deleted successfully");
    } catch (e) {
      console.log("Delete Error:", e);
      toast.error("Failed to delete event");
    }
  };

  const openEditModal = (event) => {
    setEditEvent(event);
    // Parse yyyy-mm-dd safely into a local Date
    if (
      typeof event.selectedDate === "string" &&
      /^\d{4}-\d{2}-\d{2}$/.test(event.selectedDate)
    ) {
      const [y, m, d] = event.selectedDate.split("-").map((v) => Number(v));
      setSelectedDate(new Date(y, m - 1, d));
    } else {
      setSelectedDate(new Date(event.selectedDate));
    }
    setOpenModel(true);
  };

  return (
    <div className=" z-0">
      <div className="  bg-transparent flex flex-col">
        <Header
          activeView={currentView}
          onChangeView={setCurrentView}
          events={events}
          onOpenAdd={() => {
            const today = new Date();
            setSelectedDate(today);
            setEditEvent(null);
            setOpenModel(true);
          }}
        />
        <div className="w-full flex-1">
          {currentView === "day" && (
            <DayView
              date={selectedDate || new Date()}
              events={events}
              view={currentView === "day" ? "day" : "week"}
              onEventClick={openEditModal}
              onOpenAdd={() => {
                const today = new Date();
                setSelectedDate(today);
                setEditEvent(null);
                setOpenModel(true);
              }}
            />
          )}
          {currentView === "week" && (
            <WeekView
              date={selectedDate || new Date()}
              events={events}
              onEventClick={openEditModal}
            />
          )}
          {(currentView === "month" || currentView === "year") && (
            <Calendar
              key={`${currentView}-${events.length}`}
              view={currentView === "year" ? "year" : "month"}
              value={selectedDate}
              onChange={setSelectedDate}
              className="w-full h-full p-4 rounded-md my-4"
              onClickDay={handleDateChange}
              tileContent={({ date, view }) => {
                if (view === "month") {
                  const fmt = (d) => {
                    const yyyy = d.getFullYear();
                    const mm = String(d.getMonth() + 1).padStart(2, "0");
                    const dd = String(d.getDate()).padStart(2, "0");
                    return `${yyyy}-${mm}-${dd}`;
                  };
                  const dayKey = fmt(date);
                  const eventsForDay = events.filter(
                    (event) => event.selectedDate === dayKey
                  );
                  return eventsForDay.length > 0 ? (
                    <div
                      className="flex flex-col mt-1 space-y-3 overflow-y-auto  "
                      style={{ scrollBarWidth: "none" }}
                    >
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
                          <p className="text-xs cursor-pointer hover:underline ">
                            <span
                              className={` w-full py-1 px-2  rounded-md`}
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

      <EventModal
        open={Boolean(openModel && selectedDate)}
        onClose={() => setOpenModel(false)}
        mode={editEvent ? "edit" : "create"}
        initialDate={selectedDate}
        initialEvent={editEvent}
        onSubmit={editEvent ? handleUpdate : handleCreate}
        onDelete={editEvent ? handleDelete : undefined}
      />
    </div>
  );
};

export default DateCalander;
