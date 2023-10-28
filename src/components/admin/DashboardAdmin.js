import React from "react";
import AdminLayout from "../../layouts/AdminLayout";
import "./Admin.css";
import BarchartDrugsoutcome from "../inventoryinterface/additional/BarchartDrugsoutcome";
import EmployeeChart from "./EmployeeChart";
import Patientcountchart from "./Patientcountchart";

export default function DashboardAdmin() {
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
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
