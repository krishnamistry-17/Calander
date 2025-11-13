import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";

//Reusalbe component
// Props:
// - open: boolean
// - onClose: () => void
// - mode: "create" | "edit"
// - initialDate: Date | string
// - initialEvent: object | null
// - onSubmit: (payload) => Promise<void>
// - onDelete?: () => Promise<void>
export default function EventModal({
  open,
  onClose,
  mode = "create",
  initialDate,
  initialEvent,
  onSubmit,
  onDelete,
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [colorTag, setColorTag] = useState("#4f46e5");
  const [reminder, setReminder] = useState(false);

  useEffect(() => {
    if (!open) return;
    if (initialEvent) {
      setTitle(initialEvent.title || "");
      setDescription(initialEvent.description || "");
      setStartTime(initialEvent.startTime || "");
      setEndTime(initialEvent.endTime || "");
      setColorTag(initialEvent.colorTag || "#4f46e5");
      setReminder(Boolean(initialEvent.reminder));
    } else {
      setTitle("");
      setDescription("");
      setStartTime("");
      setEndTime("");
      setColorTag("#4f46e5");
      setReminder(false);
    }
  }, [open, initialEvent]);

  const normalizeDate = (d) => {
    if (!d) return null;
    if (typeof d === "string" && /^\d{4}-\d{2}-\d{2}$/.test(d)) return d;
    const dateObj = d instanceof Date ? d : new Date(d);
    const yyyy = dateObj.getFullYear();
    const mm = String(dateObj.getMonth() + 1).padStart(2, "0");
    const dd = String(dateObj.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault?.();
    const payload = {
      title,
      description,
      startTime,
      endTime,
      colorTag,
      reminder,
      selectedDate: normalizeDate(initialDate),
    };
    await onSubmit(payload);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-[1px]"
        onClick={onClose}
      />
      <div className="relative w-full max-w-lg themed-surface rounded-xl shadow-2xl">
        <form onSubmit={handleSubmit} className="w-full p-6">
          <div className="flex items-start justify-between">
            <div className="flex flex-1 flex-col">
              <label className="text-sm font-medium themed-label">Title</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                placeholder="Title"
                className="mt-1 w-full p-2 themed-field focus:outline-none focus:ring-0"
                required
              />
            </div>
            <IoClose
              className="ml-3 cursor-pointer text-xl"
              onClick={onClose}
              aria-label="Close"
            />
          </div>

          <div className="flex flex-col mt-4">
            <label className="text-sm font-medium themed-label">
              Description
            </label>
            <textarea
              value={description}
              rows={4}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              className="mt-1 w-full p-2 themed-field focus:outline-none focus:ring-0"
            />
          </div>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium themed-label">
                Start Time
              </label>
              <input
                type="time"
                className="w-full p-2 themed-field focus:outline-none focus:ring-0"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium themed-label">
                End Time
              </label>
              <input
                type="time"
                className="w-full p-2 themed-field focus:outline-none focus:ring-0"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="text-sm font-medium themed-label">
              Color Tag
            </label>
            <div className="mt-1 flex items-center gap-2">
              <input
                type="color"
                className="w-28 h-10 p-2 themed-field focus:outline-none focus:ring-0"
                value={colorTag}
                onChange={(e) => setColorTag(e.target.value)}
              />
              <span
                className="h-3 w-3 rounded-full inline-block"
                style={{ backgroundColor: colorTag }}
              />
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2">
            <input
              id="reminder"
              type="checkbox"
              checked={reminder}
              onChange={(e) => setReminder(e.target.checked)}
              className="h-4 w-4 themed-checkbox rounded text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="reminder" className="text-sm themed-label">
              Reminder
            </label>
          </div>

          <div className="grid sm:grid-cols-2 grid-cols-1 mt-4 gap-2">
            {mode === "edit" ? (
              <>
                <button
                  className="bg-yellow-600 text-white w-full p-2 rounded-sm"
                  type="submit"
                >
                  Update
                </button>
                {onDelete ? (
                  <button
                    className="bg-red-600 text-white w-full p-2 rounded-sm"
                    type="button"
                    onClick={onDelete}
                  >
                    Delete
                  </button>
                ) : null}
              </>
            ) : (
              <button
                className="bg-green-600 text-white w-full p-2 rounded-sm"
                type="submit"
              >
                Save
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
