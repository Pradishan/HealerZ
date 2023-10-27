import React, { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import "./Admin.css";
import BarchartDrugsoutcome from "../inventoryinterface/additional/BarchartDrugsoutcome";
import EmployeeChart from "./EmployeeChart";


export default function DashboardAdmin() {

  return (
    <AdminLayout>
      <div className="dashboradmin" style={{ marginTop: "20px" }}>
        <div className="catbarchartt">
          <BarchartDrugsoutcome />
        </div>
      </div>
      <div className="dashboradmin" style={{ marginTop: "20px" }}>
        <div className="catbarchartt">
          <EmployeeChart />
        </div>
      </div>
    </AdminLayout>
  );
}
