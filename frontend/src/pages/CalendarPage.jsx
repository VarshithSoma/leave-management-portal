// src/pages/CalendarPage.js
import React from "react";
const CalendarPage = () => (
  <div>
    <h2>Leave Calendar</h2>
    <p>
      This page will display a calendar showing personal leaves, team leaves,
      and public holidays.
    </p>
    {/* A library like 'react-big-calendar' or 'FullCalendar' would be integrated here */}
    <div
      style={{
        height: "500px",
        backgroundColor: "#e9ecef",
        display: "grid",
        placeContent: "center",
        borderRadius: "8px",
      }}
    >
      [Calendar Component Placeholder]
    </div>
  </div>
);
export default CalendarPage;
