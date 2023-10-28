import React,{useEffect,useState} from "react";
import AdminLayout from "../../layouts/AdminLayout";
import "./Admin.css";
import BarchartDrugsoutcome from "../inventoryinterface/additional/BarchartDrugsoutcome";
import EmployeeChart from "./EmployeeChart";
import Patientcountchart from "./Patientcountchart";
import axios from "axios";

export default function DashboardAdmin() {

  const [patientCount, setPatientCount] = useState(0);

  useEffect(() => {
    axios.get("http://localhost/Healerz/PHP/admin/patienttotal.php")
      .then((response) => {
        setPatientCount(response.data);
      })
      .catch((error) => {
        console.error("Error fetching patient count:", error);
      });
  }, []);
  return (
    <AdminLayout>
      <div className="dashboradmin" style={{ marginTop: "20px" }}>
        <div className="catbarchartt">
          <BarchartDrugsoutcome />
        </div>
      </div>
      <div style={{display:'flex' ,width:'100%'}}>
        <div className="dashboradmin2" style={{ marginTop: "20px" }}>
          <div className="catbarchartt">
            <EmployeeChart />
          </div>
        </div>
        <div className="dashboradmin2" style={{ marginTop: "20px" }}>
          <div className="catbarchartt2">
            <Patientcountchart />
            <h3>Patient Total</h3>
            <h2>{patientCount}</h2>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
