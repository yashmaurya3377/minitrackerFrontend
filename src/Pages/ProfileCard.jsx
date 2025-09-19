import React, { useContext, useMemo } from "react";
import { motion } from "framer-motion";
import { CircleUserRound, LogOut, X } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import { EventContext } from "../context/EventContext";

const ProfileCard = ({ onClose }) => {
  const { user, logout } = useContext(AuthContext );
  const { events } = useContext(EventContext);

  const { upcomingCount, pastCount } = useMemo(() => {
    if (!user) return { upcomingCount: 0, pastCount: 0 };

    const now = new Date();
    const userEvents = events.filter((event) => event.createdBy?._id === user._id);

    const upcomingCount = userEvents.filter((event) => new Date(event.date) >= now).length;
    const pastCount = userEvents.filter((event) => new Date(event.date) < now).length;

    return { upcomingCount, pastCount };
  }, [user, events]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-lg p-6 w-80 relative"
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
      >
        <X size={20} />
      </button>

      {/* Avatar + Info */}
      <div className="text-center mb-6 flex flex-col items-center">
        <div className="bg-blue-600 h-20 w-20 rounded-full flex items-center justify-center mb-4 shadow-md">
          {user?.name ? (
            <span className="text-white text-2xl font-bold">
              {user.name.charAt(0).toUpperCase()}
            </span>
          ) : (
            <CircleUserRound className="text-white h-10 w-10" />
          )}
        </div>
        <h2 className="text-xl font-bold text-gray-800">
          {user?.name || "John Doe"}
        </h2>
        <p className="text-gray-600 text-sm">{user?.email || "johndoe@example.com"}</p>
        {user?.phone && (
          <p>
            <span className="font-semibold">Phone:</span> {user.phone}
          </p>
        )}
      </div>

      {/* Stats */}
      <div className="flex justify-around mb-6">
        <div className="text-center">
          <span className="block text-xl font-bold">{upcomingCount}</span>
          <span className="text-gray-600 text-sm">Upcoming</span>
        </div>
        <div className="text-center">
          <span className="block text-xl font-bold">{pastCount}</span>
          <span className="text-gray-600 text-sm">Past</span>
        </div>
      </div>

      {/* Logout Button */}
      <button
        onClick={logout}
        className="w-full flex items-center justify-center gap-2 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
      >
        <LogOut size={18} /> Logout
      </button>
    </motion.div>
  );
};

export default ProfileCard;
