import "./App.css";
import "./index.css"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Admin from "./components/admin/Admin";
import Doctorinterface from "./components/doctorinterface/Doctorinterface";
import Inventory from "./components/inventoryinterface/Inventory";
import Clubs from "./components/clubs/Clubs";
import Profile from "./components/profile/Profile";
import Login from "./components/login/Login";
import Home from "./components/home/Home";
import Loader from "./components/Loader";
import Page404 from "./components/page404/Page404";

function App() {
  return (
    // <Router>
      <div className="">
        {/* <Loader /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/doctor" element={<Doctorinterface />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/clubs" element={<Clubs />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/*" element={<Page404 />} />
        </Routes>
      </div>
    // </Router>
  );
}

export default App;
