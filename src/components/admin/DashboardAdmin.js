import React, { useEffect, useRef } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import "./Admin.css";
import nusnan from "../../assets/nusnan.jpg";
import pradi from "../../assets/pradi.jpg";
import thanu from "../../assets/thanu.jpg";
import powsi from "../../assets/Powsi.jpg";
import farhath from "../../assets/farhath.jpg";
import jana from "../../assets/jana.jpg";
import joshi from "../../assets/joshi.jpg";

function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  );
}

export default function DashboardAdmin() {
  const events = [{ title: "Meeting", start: new Date() }];
  const calendarRef = useRef(null);

  useEffect(() => {
    const calendarElement = calendarRef.current;
    const centerCalendar = () => {
      if (calendarElement) {
        const windowHeight = window.innerHeight;
        const calendarHeight = calendarElement.clientHeight;
        const marginTop = (windowHeight - calendarHeight) / 2;
        calendarElement.style.marginTop = `${marginTop}px`;
      }
    };

    centerCalendar();

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", centerCalendar);
    };
  }, []);

  return (
    <AdminLayout>
      <h3 className="serhett">Calender</h3>
      <div className="calenderrr">
        <div className="" ref={calendarRef}>
          <FullCalendar
            ref={calendarRef}
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            weekends={true}
            events={events}
            eventContent={renderEventContent}
          />
        </div>
      </div>
      <hr />
      <div className="container text-center mu-auto teamele teaaaaam">
        <h3 className="serhett">MEET OUR TEAM</h3>
        <img src={nusnan} className="card-img-top img" alt="..." />
        <img src={pradi} className="card-img-top img" alt="..." />
        <img src={thanu} className="card-img-top img" alt="..." />
        <img src={powsi} className="card-img-top img" alt="..." />
        <img src={farhath} className="card-img-top img" alt="..." />
        <img src={jana} className="card-img-top img" alt="..." />
        <img src={joshi} className="card-img-top img" alt="..." />
      </div>
    </AdminLayout>
  );
}
