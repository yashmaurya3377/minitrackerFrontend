import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Home from "./Pages/Home";
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";
import EventList from './Pages/event/EventList';
import CreateEvent from './Pages/event/CreateEvent';
import MyEvents from './Pages/event/MyEvent';
import SingleEvent from './Pages/event/SingleEvent';


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/create-event" element={<PrivateRoute><CreateEvent /></PrivateRoute>} />
        <Route path="/events" element={<PrivateRoute><EventList /></PrivateRoute>} />
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />
        <Route path="/events/:id" element={<SingleEvent />} />
        <Route path="/my-events" element={<PublicRoute><MyEvents/></PublicRoute>} />
      </Routes>
    </>
  );
}

export default App;
