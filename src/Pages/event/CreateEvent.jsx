import React, { useState } from "react";
import { motion } from "framer-motion";
import { Video, MapPin, ArrowRight } from 'lucide-react'
import EventForm from "./EventForm";

const CreateEvent = () => {
  const [form, setform] = useState(false);
  return (
    <div>   
   {!form && <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 mt-20">
      {/* Header */}
      <motion.h1 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-3xl font-bold text-gray-900 mb-8 text-center"
      >
        Create New Event
      </motion.h1>

      {/* Event Type Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
        {/* Online Event Card */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="bg-white rounded-xl shadow-md p-8 border border-gray-200 hover:shadow-lg transition-shadow duration-300 flex flex-col h-64"
        >
          <div className="flex-1">
            <div className="flex  flex-col gap-10 items-center mb-4">
              
                <Video className="h-8 w-8 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-800">Create an Online Event</h2>
            </div>
           
          </div>
          <button
          onClick={()=>setform(true)}
            className="inline-flex items-center justify-between bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition duration-300 group w-full"
          >
            <span>Create</span>
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>

        {/* Venue Event Card */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="bg-white rounded-xl shadow-md p-8 border border-gray-200 hover:shadow-lg transition-shadow duration-300 flex flex-col h-64"
        >
          <div className="flex-1">
            <div className="flex items-center flex-col gap-10 mb-4">
               <MapPin className="h-8 w-8 text-green-600" />
              <h2 className="text-xl font-semibold text-gray-800">Create a Venue Event</h2>
            </div>
           
          </div>
          <button
            onClick={()=>setform(true)}
            className="inline-flex items-center justify-between bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition duration-300 group w-full"
          >
            <span>Create</span>
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>  
    </div>}
    {
      form && <EventForm/>
    }
    </div>
  );
};

export default CreateEvent;
