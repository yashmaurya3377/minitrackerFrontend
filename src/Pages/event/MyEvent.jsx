import React, { useEffect, useState } from "react";
import API from "../../services/api";
import { Calendar, MapPin, Clock } from "lucide-react";

const MyEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/events/my-events")
      .then((res) => setEvents(res.data))
      .catch(() => setEvents([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  const now = new Date();
  const upcomingEvents = events.filter((e) => new Date(e.date) >= now);
  const pastEvents = events.filter((e) => new Date(e.date) < now);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
        📌 My Events
      </h2>

      {events.length === 0 ? (
        <p className="text-center text-gray-500">
          You haven’t created any events yet.
        </p>
      ) : (
        <div className="space-y-10">
          {/* Upcoming Events */}
          <section>
            <h3 className="text-xl font-semibold mb-4 text-green-600">
              🌟 Upcoming Events
            </h3>
            {upcomingEvents.length === 0 ? (
              <p className="text-gray-500">No upcoming events.</p>
            ) : (
              <ul className="grid gap-6 sm:grid-cols-2">
                {upcomingEvents.map((e) => (
                  <li
                    key={e._id}
                    className="p-5 border rounded-xl shadow hover:shadow-md transition bg-white"
                  >
                    <h4 className="text-lg font-bold text-gray-800 mb-2">
                      {e.title}
                    </h4>
                    <p className="flex items-center text-sm text-gray-600 mb-1">
                      <Calendar size={16} className="mr-2 text-blue-500" />
                      {new Date(e.date).toLocaleDateString()}
                    </p>
                    <p className="flex items-center text-sm text-gray-600 mb-1">
                      <Clock size={16} className="mr-2 text-purple-500" />
                      {new Date(e.date).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                    <p className="flex items-center text-sm text-gray-600 mb-2">
                      <MapPin size={16} className="mr-2 text-red-500" />
                      {e.location}
                    </p>
                    <p className="text-gray-700 text-sm line-clamp-2">
                      {e.description}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </section>

          {/* Past Events */}
          <section>
            <h3 className="text-xl font-semibold mb-4 text-red-600">
              📅 Past Events
            </h3>
            {pastEvents.length === 0 ? (
              <p className="text-gray-500">No past events.</p>
            ) : (
              <ul className="grid gap-6 sm:grid-cols-2">
                {pastEvents.map((e) => (
                  <li
                    key={e._id}
                    className="p-5 border rounded-xl shadow hover:shadow-md transition bg-gray-50"
                  >
                    <h4 className="text-lg font-bold text-gray-800 mb-2">
                      {e.title}
                    </h4>
                    <p className="flex items-center text-sm text-gray-600 mb-1">
                      <Calendar size={16} className="mr-2 text-blue-500" />
                      {new Date(e.date).toLocaleDateString()}
                    </p>
                    <p className="flex items-center text-sm text-gray-600 mb-1">
                      <Clock size={16} className="mr-2 text-purple-500" />
                      {new Date(e.date).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                    <p className="flex items-center text-sm text-gray-600 mb-2">
                      <MapPin size={16} className="mr-2 text-red-500" />
                      {e.location}
                    </p>
                    <p className="text-gray-700 text-sm line-clamp-2">
                      {e.description}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      )}
    </div>
  );
};

export default MyEvents;
