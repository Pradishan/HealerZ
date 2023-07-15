import "./App.css";
import "./index.css"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Admin from "./components/admin/Admin";
import Doctorinterface from "./components/doctorinterface/Doctorinterface";
import Dashboard from "./components/inventoryinterface/Dashboard";
import Inventory from "./components/inventoryinterface/Inventory";
import Clubs from "./components/clubs/Clubs";
import Profile from "./components/profile/Profile";
import Login from "./components/login/Login";
import Home from "./components/home/Home";
import Loader from "./components/Loader";
import Manage from "./components/inventoryinterface/Manage";
import Supply from "./components/inventoryinterface/Supply";

function App() {
  return (
    // <Router>
      <div className="">
        {/* <Loader /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/doctor" element={<Doctorinterface />} />
          <Route path="/inventory" element={<Inventory/>} />
          <Route path="/clubs" element={<Clubs />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/manage" element={<Manage />} />
            <Route path="/supply" element={<Supply />} />

        </Routes>
      </div>
    // </Router>
  );
}

export default App;