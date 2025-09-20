import React, { createContext, useState, useEffect } from "react";
import API from "../services/api";

export const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Load user on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      API.get("/auth/me")
        .then((res) => setUser(res.data.user))
        .catch(() => setUser(null));
    }
  }, []);

  useEffect(() => {
    API.get("/events")
      .then((res) => setEvents(res.data))
      .catch((err) => setError(err.response?.data?.msg || "Failed to load events"))
      .finally(() => setLoading(false));
  }, [events]);

 const createEvent = async (formData) => {
  try {
    const res = await API.post("/events", formData);
    setEvents((prev) => [res.data.event, ...prev]); 
    return { success: true, message: "Event created successfully!"};
  }
   catch (err) {
    return { success: false, message: err.response?.data?.msg || "Failed to create event" };
  }
  finally{
    // window.location.reload()
  }
};


  return (
    <EventContext.Provider
      value={{ user, setUser, events, setEvents, loading, error, createEvent }}
    >
      {children}
    </EventContext.Provider>
  );
};
