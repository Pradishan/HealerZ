import React, { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import "./Admin.css";
import BarchartDrugsoutcome from "../inventoryinterface/additional/BarchartDrugsoutcome";
import Calendar from "react-calendar";

export default function DashboardAdmin() {
  const [value, onChange] = useState(new Date());

  return (
    <AdminLayout>
      <div className="dashboradmin" style={{ marginTop: "20px" }}>
        <div className="catbarchartt">
          <BarchartDrugsoutcome />
          <hr />
          <Calendar
            onChange={onChange}
            value={value}
            className="custom-calendar7"
          />
        </div>
      </div>
    </AdminLayout>
  );
}
