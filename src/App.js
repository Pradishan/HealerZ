import "./App.css";
import "./index.css"
import { Route, Routes } from "react-router-dom";
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
import Page404 from "./components/page404/Page404";
import DoctorLogin from "./components/login/DoctorLogin";
import Settings from "./components/inventoryinterface/Settings";
import Protected from "./components/login/Protected";
import Protected1 from "./components/login/Protected1";
import InventoryLogin from "./components/login/InventoryLogin";

function App() {
  return (
    // <Router>
      <div className="">
        {/* <Loader /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/doctor" element={<Protected Component ={Doctorinterface} />} />
          <Route path="/inventory-interface/inventory" element={<Protected1 Component ={Inventory} />} />
          <Route path="/clubs" element={<Clubs />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/inventory-interface/dashboard"  element={<Protected1 Component ={Dashboard} />} />
          <Route path="/inventory-interface/manage" element={<Protected1 Component ={Manage} />} />
          <Route path="/inventory-interface/supply"  element={<Protected1 Component ={Supply} />} />
          <Route path="/loginDoctor" element={<DoctorLogin />} />
          <Route path="/LoginInventory" element={<InventoryLogin/>}/>
          <Route path="/inventory-interface/settings"  element={<Protected1 Component ={Settings} />}/>
          <Route path="/*" element={<Page404 />} />
        </Routes>
      </div>
    // </Router>
  );
}

export default App;