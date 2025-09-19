import React, { useEffect, useState } from "react";
import API from "../services/api";
import { motion } from "framer-motion";
import { CheckCircle, Calendar, Ticket, Users } from "lucide-react";

const Home = () => {
  const [user, setUser] = useState(null);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API.get("/auth/me");
        setUser(res.data.user);
      } catch (err) {
        console.error("User fetch error:", err.response?.data || err.message);
      }
    };

    const fetchEvents = async () => {
      try {
        const res = await API.get("/events");
        setEvents(res.data.events || res.data || []);
      } catch (err) {
        console.error("Events fetch error:", err.response?.data || err.message);
        setEvents([]);
      }
    };

    fetchUser();
    fetchEvents();
  }, []);

  const upcomingEvents = Array.isArray(events)
    ? events.filter((e) => new Date(e.date) >= new Date())
    : [];

  return (
    <div className="min-h-screen mt-10">
    <section className="relative py-16 md:py-24 bg-[url('/image.png')] bg-contain bg-center w-full ">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-xl md:text-1xl lg:text-3xl font-bold text-gray-900 mb-6 leading-tight"
            >
              The Easiest and Most Powerful<br />Online Event
            </motion.h1>
            
            <motion.h2
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl md:text-1xl lg:text-3xl font-bold text-blue-700 mb-6 leading-tight"
            >
              Booking and Ticketing System
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-gray-700 text-xl max-w-3xl mx-auto mb-10 leading-relaxed"
            >
              Barren is an all-in-one event ticketing platform for event organisers,
              promoters, and managers. Easily create, promote and manage your
              events of any type and size.
            </motion.p>

            <motion.a
              href="/create-event"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-lg shadow-md transition duration-300 text-lg"
            >
              Create Event
            </motion.a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">Why Choose Our Platform?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gray-50 p-6 rounded-lg shadow-md text-center"
            >
              <div className="flex justify-center mb-4">
                <Calendar className="h-12 w-12 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Easy Event Creation</h3>
              <p className="text-gray-600">Create and customize events in minutes with our intuitive interface.</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-gray-50 p-6 rounded-lg shadow-md text-center"
            >
              <div className="flex justify-center mb-4">
                <Ticket className="h-12 w-12 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Seamless Ticketing</h3>
              <p className="text-gray-600">Sell tickets online with secure payment processing and instant delivery.</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-gray-50 p-6 rounded-lg shadow-md text-center"
            >
              <div className="flex justify-center mb-4">
                <Users className="h-12 w-12 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Audience Management</h3>
              <p className="text-gray-600">Track attendees, send updates, and manage your audience effectively.</p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;