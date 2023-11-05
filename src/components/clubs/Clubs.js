import React, { useEffect, useState } from "react";
import ClubLayout from "../../layouts/ClubLayout";
import "../admin/Admin.css";
import EventIncome from "./EventIncome";
import EventCountChart from "./EventCountChart";
import clubdashboard from "../../assets/clubdashboard.svg";
import axios from "axios";

export default function Clubs() {
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost/Healerz/PHP/club/eventCategoriesCount.php")
      .then((response) => {
        const data = response.data;
        let totalCount = 0;
        data.forEach((event) => {
          totalCount += event.count;
        });
        setTotalCount(totalCount);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  return (
    <ClubLayout>
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <div className="summarycatcont" style={{ marginTop: "30px" }}>
          <div className="catbarchartt">
            <EventIncome />
          </div>
        </div>
        <div
          className="summarycatcont col d-flex justify-content-center"
          style={{ gap: "150px" }}
        >
          <img src={clubdashboard} alt="" height={"360px"} />
          <div className="catbarchartt2">
          <EventCountChart />
            <h3>Event Total</h3>
            <h2>{totalCount}</h2>
          </div>
        </div>
      </div>
    </ClubLayout>
  );
}
