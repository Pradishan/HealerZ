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
import MedicalRequest from "./components/profile/MedicalRequest";
import DashboardAdmin from "./components/admin/DashboardAdmin";
import AddDoctor from "./components/admin/AddDoctor";
import AddPatient from "./components/admin/AddPatient";
import UpdatePatient from "./components/admin/UpdatePatient";
import PatientList from "./components/admin/PatientList";
import HumanResource from "./components/admin/HumanResource";
import MedicalReport from "./components/admin/MedicalReport";

function App() {
  return (
    // <Router>
      <div className="">
        {/* <Loader /> */}
      <Routes>
        <Route path="/*" element={ <Page404 /> } />
        <Route path="/" element={ <Home /> } />
        <Route path="/doctor" element={ <Protected Component={ Doctorinterface } roll={'Doctor'} /> } />
        <Route path="/inventory-interface/inventory" element={ <Protected1 Component={ Inventory } roll={'Pharmacist'} /> } />
        <Route path="/clubs" element={ <Clubs /> } />
        <Route path="/profile" element={ <Profile /> } />
        <Route path="/login" element={ <Login /> } />
        <Route path="/admin" element={ <Admin /> } />
        <Route path="/inventory-interface/dashboard" element={ <Protected1 Component={ Dashboard } roll={'Pharmacist'} /> } />
        <Route path="/inventory-interface/manage" element={ <Protected1 Component={ Manage } roll={'Pharmacist'}/> } />
        <Route path="/inventory-interface/supply" element={ <Protected1 Component={ Supply }roll={'Pharmacist'} /> } />
        <Route path="/loginDoctor" element={ <DoctorLogin /> } />
        <Route path="/LoginInventory" element={ <InventoryLogin /> } />
        <Route path="/inventory-interface/settings" element={ <Protected1 Component={ Settings } roll={'Pharmacist'}/> } />
        <Route path="/MedicalRequest" element={ <MedicalRequest /> } />
        <Route path="/admin/dashboard" element={ <DashboardAdmin /> } />
        <Route path="/admin/adddoctor" element={ <AddDoctor /> } />
        <Route path="/admin/addpatient" element={ <AddPatient /> } />
        <Route path="/admin/editpatient" element={ <UpdatePatient /> } />
        <Route path="/admin/patientlist" element={ <PatientList /> } />
        <Route path="/admin/humanresource" element={ <HumanResource /> } />
        <Route path="/admin/medicalreports" element={ <MedicalReport /> } />
        
      </Routes>
      </div>
    // </Router>
  );
}

export default App;