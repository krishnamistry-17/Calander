import { useCallback, useState } from "react";
import { supabase } from "../lib/supabase.client";

const normalizeDate = (d) => {
  if (!d) return null;
  // Accept preformatted yyyy-mm-dd
  if (typeof d === "string" && /^\d{4}-\d{2}-\d{2}$/.test(d)) return d;
  const dateObj = d instanceof Date ? d : new Date(d);
  const yyyy = dateObj.getFullYear();
  const mm = String(dateObj.getMonth() + 1).padStart(2, "0");
  const dd = String(dateObj.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};

export function useEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchEvents = useCallback(async () => {
    setLoading(true);
    setError(null);
    const { data, error: err } = await supabase.from("details").select("*");
    if (err) {
      setError(err);
    } else {
      setEvents(data || []);
    }
    setLoading(false);
  }, []);

  const createEvent = useCallback(async (payload) => {
    const toInsert = {
      ...payload,
      selectedDate: normalizeDate(payload.selectedDate),
    };
    const { data, error: err } = await supabase
      .from("details")
      .insert(toInsert)
      .select();
    if (err) throw err;
    if (data && data.length) {
      setEvents((prev) => [...prev, ...data]);
    }
    return data?.[0];
  }, []);

  const updateEvent = useCallback(async (id, payload) => {
    const toUpdate = {
      ...payload,
      selectedDate: normalizeDate(payload.selectedDate),
    };
    const { data, error: err } = await supabase
      .from("details")
      .update(toUpdate)
      .eq("id", id)
      .select();
    if (err) throw err;
    const updated = data?.[0];
    if (updated) {
      setEvents((prev) =>
        prev.map((ev) => (Number(ev.id) === Number(id) ? updated : ev))
      );
    }
    return updated;
  }, []);

  const deleteEvent = useCallback(async (id) => {
    const { error: err } = await supabase.from("details").delete().eq("id", id);
    if (err) throw err;
    setEvents((prev) => prev.filter((ev) => Number(ev.id) !== Number(id)));
  }, []);

  return {
    events,
    loading,
    error,
    fetchEvents,
    createEvent,
    updateEvent,
    deleteEvent,
  };
}
