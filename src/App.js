import "./App.css";
import "./index.css"
import { Route, Routes } from "react-router-dom";
import Doctorinterface from "./components/doctorinterface/Doctorinterface";
import Dashboard from "./components/inventoryinterface/Dashboard";
import Summary from "./components/inventoryinterface/Summary";
import Inventory from "./components/inventoryinterface/Inventory";
import Clubs from "./components/clubs/Clubs";
import Eventresponse from "./components/clubs/Eventresponse";
import Profile from "./components/profile/Profile";
import Login from "./components/login/Login";
import Home from "./components/home/Home";
// import Loader from "./components/Loader";
import Supply from "./components/inventoryinterface/Supply";
import Page404 from "./components/page404/Page404";
import Settings from "./components/inventoryinterface/Settings";
import Protected from "./components/login/Protected";
import Protected1 from "./components/login/Protected1";
import DashboardAdmin from "./components/admin/DashboardAdmin";
import AddPatient from "./components/admin/AddPatient";
import UpdatePatient from "./components/admin/UpdatePatient";
import PatientList from "./components/admin/PatientList";
import AddEmployee from "./components/admin/AddEmployee";
import EmployeeList from "./components/admin/EmployeeList";
import Protected2 from "./components/login/Protected2";
import BloodDonation from "./components/clubs/Blooddonation";
import Vaccination from "./components/clubs/Vaccination";
import Registration from "./components/clubs/Registration";
import Protected3 from "./components/login/Protected3";
import HealerZ from "./components/HealerZ";
import Test123 from "./components/Test123";


function App() {
  return (
    // <Router>
      <div className="">
        {/* <Loader /> */}
      <Routes>
        <Route path="/*" element={ <Page404 /> } />
        <Route path="/home" element={ <Home /> } />
        <Route path="/doctor" element={ <Protected Component={ Doctorinterface } roll={'Doctor'} /> } />
        <Route path="/inventory-interface/inventory" element={ <Protected1 Component={ Inventory } roll={'Pharmacist'} /> } />
        <Route path="/clubs/dashboard" element={ <Clubs /> } />
        <Route path="/clubs/Eventresponse" element={ <Eventresponse /> } />
        <Route path="/login" element={<Login />} />
        <Route
          path="/profile"
          element={<Protected3 Component={Profile} role="patient" />}
        />
        <Route path="/inventory-interface/dashboard" element={ <Protected1 Component={ Dashboard } roll={'Pharmacist'} /> } />
        <Route path="/inventory-interface/supply" element={ <Protected1 Component={ Supply }roll={'Pharmacist'} /> } />
        <Route path="/inventory-interface/summary" element={ <Protected1 Component={ Summary }roll={'Pharmacist'} /> } />
        <Route path="/inventory-interface/settings" element={ <Protected1 Component={ Settings } roll={'Pharmacist'}/> } />
        <Route path="/admin/dashboard" element={<Protected2 Component={ DashboardAdmin  } roll={'admin'} /> } />
        <Route path="/admin/addpatient" element={ <Protected2 Component={ AddPatient} roll={'admin'} /> } />
        <Route path="/admin/editpatient" element={ <Protected2 Component={ UpdatePatient } roll={'admin'} /> } />
        <Route path="/admin/patientlist" element={ <Protected2 Component={ PatientList} roll={'admin'} />} />
        <Route path="/admin/addemployee" element={ <Protected2 Component={ AddEmployee } roll={'admin'} /> } />
        <Route path="/admin/employeelist" element={ <Protected2 Component={ EmployeeList } roll={'admin'} /> } />
        <Route path="/clubs/blooddonation" element={<BloodDonation />}/>
        <Route path="/clubs/vacination" element={<Vaccination />}/>
        <Route path="/clubs/registration" element={<Registration/>}/>
        <Route path="/" element={<HealerZ/>}/>
        <Route path="/test" element={<Test123/>}/>
        
      </Routes>
      </div>
    // </Router>
  );
}

export default App;