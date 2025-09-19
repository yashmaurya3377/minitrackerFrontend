import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import { Share2, Calendar, MapPin, User, Copy, MessageCircle } from "lucide-react";
import { EventContext } from "../../context/EventContext";
import { AuthContext } from "../../context/AuthContext";
const EventList = () => {
  const { events, loading, error } = useContext(EventContext);
  const { user } = useContext(AuthContext);
  const [copiedEventId, setCopiedEventId] = useState(null);
  const [filter, setFilter] = useState("all");
  const [openMenuId, setOpenMenuId] = useState(null);
   
  
  const handleCopyLink = (eventId) => {
    const shareUrl = `${window.location.origin}/events/${eventId}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopiedEventId(eventId);
      setTimeout(() => setCopiedEventId(null), 2000);
    });
  };

  const handleWhatsAppShare = (eventId) => {
    const shareUrl = `${window.location.origin}/events/${eventId}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
      `📌 Check out this event: ${shareUrl}`
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  const filteredEvents = events
    .filter((event) => event.createdBy?._id === user?._id)
    .filter((event) => {
      const eventDate = new Date(event.date);
      const today = new Date();
      if (filter === "upcoming") return eventDate >= today;
      if (filter === "past") return eventDate < today;
      return true;
    });

  if (loading)
    return (
      <p className="text-center mt-20 text-gray-600 animate-pulse text-lg ">
        Loading events...
      </p>
    );

  if (error)
    return (
      <p className="text-center mt-20 text-red-500 font-semibold">
        {error}
      </p>
    );

  return (
    <div className="min-w-[99vh] min-h-[98vh] py-29 mx-auto mt-10 bg-gradient-to-br from-blue-500 to-gray-100">
      <h2 className="text-4xl font-extrabold mb-10 text-center text-gray-800 tracking-tight">
        🎉 My Events
      </h2>

      {/* Filter buttons */}
      <div className="flex justify-center gap-4 mb-10">
        {["all", "upcoming", "past"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-5 py-2.5 rounded-full text-sm font-medium shadow-sm transition 
              ${filter === f
                ? "bg-blue-600 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Events list */}
      {filteredEvents.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          No events found. Try creating one!
        </p>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredEvents.map((event, i) => (
            <motion.div
              key={event._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition duration-300 overflow-hidden"
            >
              <div className="p-6 flex flex-col h-full">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {event.title}
                </h3>

                <div className="space-y-2 text-sm text-gray-600">
                  <p className="flex items-center">
                    <Calendar size={16} className="mr-2 text-blue-500" />
                    {new Date(event.date).toLocaleDateString()} 
                  </p>
                  <p className="flex items-center">
                    <MapPin size={16} className="mr-2 text-red-500" />
                    {event.location}
                  </p>
                  <p className="line-clamp-3 text-gray-700 text-sm">
                    {event.description}
                  </p>
                </div>

                <p className="mt-4 flex items-center text-sm text-gray-900 italic">
                  <User size={14} className="mr-1" />
                  {event.createdBy?.name || "Unknown"} (
                  {event.createdBy?.email})
                </p>

                {/* Share menu */}
                <div className="mt-auto relative">
                  <button
                    onClick={() =>
                      setOpenMenuId(openMenuId === event._id ? null : event._id)
                    }
                    className="flex items-center justify-center gap-2 w-full bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
                  >
                    Share <Share2 size={18} />
                  </button>

                  {openMenuId === event._id && (
                    <div className="absolute bottom-full mb-2 w-full bg-white border rounded-lg shadow-lg overflow-hidden">
                      <button
                        onClick={() => handleCopyLink(event._id)}
                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <Copy size={16} />{" "}
                        {copiedEventId === event._id ? "✅ Link Copied" : "Copy Link"}
                      </button>
                      <button
                        onClick={() => handleWhatsAppShare(event._id)}
                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <MessageCircle size={16} className="text-green-600" /> Share on WhatsApp
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventList;
