
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../services/api";

const SingleEvent = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get(`/events/${id}`)
      .then((res) => setEvent(res.data))
      .catch(() => setEvent(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading event...</p>;
  if (!event)
    return (
      <p className="text-center mt-10 text-red-500">Event not found</p>
    );

  return (
    <div className="max-w-2xl mx-auto p-6 mt-19">
      <h1 className="text-3xl font-bold mb-2">{event.title}</h1>
      <p className="text-gray-600 mb-1">
        📅 {new Date(event.date).toLocaleDateString()}
      </p>
      <p className="text-gray-600 mb-4">📍 {event.location}</p>
      <p className="text-gray-700">{event.description}</p>
      <p className="mt-4 text-xs text-gray-400">
        Created by: {event.createdBy?.name || "Unknown"} (
        {event.createdBy?.email})
      </p>
    </div>
  );
};

export default SingleEvent;
