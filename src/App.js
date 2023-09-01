import "./App.css";
import "./index.css"
import { Route, Routes } from "react-router-dom";
import Doctorinterface from "./components/doctorinterface/Doctorinterface";
import Dashboard from "./components/inventoryinterface/Dashboard";
import Inventory from "./components/inventoryinterface/Inventory";
import Clubs from "./components/clubs/Clubs";
import Eventresponse from "./components/clubs/Eventresponse";
import Profile from "./components/profile/Profile";
import Login from "./components/login/Login";
import Home from "./components/home/Home";
// import Loader from "./components/Loader";
import Manage from "./components/inventoryinterface/Manage";
import Supply from "./components/inventoryinterface/Supply";
import Page404 from "./components/page404/Page404";
import DoctorLogin from "./components/login/DoctorLogin";
import Settings from "./components/inventoryinterface/Settings";
import Protected from "./components/login/Protected";
import Protected1 from "./components/login/Protected1";
import InventoryLogin from "./components/login/InventoryLogin";
import DashboardAdmin from "./components/admin/DashboardAdmin";
import AddDoctor from "./components/admin/AddDoctor";
import DoctorList from "./components/admin/DoctorList";
import AddPatient from "./components/admin/AddPatient";
import UpdatePatient from "./components/admin/UpdatePatient";
import PatientList from "./components/admin/PatientList";
import AddEmployee from "./components/admin/AddEmployee";
import EmployeeList from "./components/admin/EmployeeList";
import MedicalReport from "./components/admin/MedicalReport";
import AdminLogin from "./components/login/AdminLogin";
import Protected2 from "./components/login/Protected2";
import BloodDonation from "./components/clubs/Blooddonation";
import Vaccination from "./components/clubs/Vaccination";
import Registration from "./components/clubs/Registration";


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
        <Route path="/clubs/dashboard" element={ <Clubs /> } />
        <Route path="/clubs/Eventresponse" element={ <Eventresponse /> } />
        <Route path="/profile" element={ <Profile /> } />
        <Route path="/login" element={ <Login /> } />
        <Route path="/inventory-interface/dashboard" element={ <Protected1 Component={ Dashboard } roll={'Pharmacist'} /> } />
        <Route path="/inventory-interface/manage" element={ <Protected1 Component={ Manage } roll={'Pharmacist'}/> } />
        <Route path="/inventory-interface/supply" element={ <Protected1 Component={ Supply }roll={'Pharmacist'} /> } />
        <Route path="/loginDoctor" element={ <DoctorLogin /> } />
        <Route path="/LoginInventory" element={ <InventoryLogin /> } />
        <Route path="/inventory-interface/settings" element={ <Protected1 Component={ Settings } roll={'Pharmacist'}/> } />
        <Route path="/admin/dashboard" element={<Protected2 Component={ DashboardAdmin  } roll={'admin'} /> } />
        <Route path="/admin/adddoctor" element={ <Protected2 Component={ AddDoctor } roll={'admin'} /> } />
        <Route path="/admin/doctorlist" element={ <Protected2 Component={ DoctorList } roll={'admin'} />} />
        <Route path="/admin/addpatient" element={ <Protected2 Component={ AddPatient} roll={'admin'} /> } />
        <Route path="/admin/editpatient" element={ <Protected2 Component={ UpdatePatient } roll={'admin'} /> } />
        <Route path="/admin/patientlist" element={ <Protected2 Component={ PatientList} roll={'admin'} />} />
        <Route path="/admin/addemployee" element={ <Protected2 Component={ AddEmployee } roll={'admin'} /> } />
        <Route path="/admin/employeelist" element={ <Protected2 Component={ EmployeeList } roll={'admin'} /> } />
        <Route path="/admin/medicalreports" element={ <Protected2 Component={ MedicalReport } roll={'admin'} /> } />
        <Route path="/loginAdmin" element={<AdminLogin/>}/>
        <Route path="/clubs/blooddonation" element={<BloodDonation />}/>
        <Route path="/clubs/vacination" element={<Vaccination />}/>
        <Route path="/clubs/registration" element={<Registration/>}/>
        
      </Routes>
      </div>
    // </Router>
  );
}

export default App;