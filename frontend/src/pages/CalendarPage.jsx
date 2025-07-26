import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

const CalendarPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth(); // Get user role

  useEffect(() => {
    const fetchCalendarData = async () => {
      try {
        let response;
        if (user.role === 'manager') {
          // Managers see their team's calendar
          response = await api.get('/manager/team/calendar');
        } else {
          // Regular users see their own calendar
          response = await api.get('/user/calendar');
        }
        
        // Format data for a potential calendar library (e.g., react-big-calendar)
        const holidays = response.data.holidays.map(h => ({
          title: h.name,
          start: new Date(h.holiday_date),
          end: new Date(h.holiday_date),
          allDay: true,
          type: 'holiday'
        }));

        const leavesKey = user.role === 'manager' ? 'teamLeaves' : 'personalLeaves';
        const leaves = response.data[leavesKey]
          .filter(l => l.status === 'approved') // Only show approved leaves
          .map(l => ({
            title: user.role === 'manager' ? `${l.first_name}'s Leave` : 'My Leave',
            start: new Date(l.start_date),
            end: new Date(l.end_date),
            allDay: true,
            type: 'leave'
          }));

        setEvents([...holidays, ...leaves]);

      } catch (error) {
        console.error("Failed to fetch calendar data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchCalendarData();
    }
  }, [user]);

  return (
    <div>
      <h2>Leave Calendar</h2>
      <p>
        This page displays personal/team leaves and public holidays.
        Below is a placeholder for a calendar component like 'react-big-calendar'.
      </p>

      <div style={{ height: "500px", border: "1px solid #ccc", borderRadius: "8px", padding: "10px", overflowY: 'auto' }}>
        <h3>[Calendar Component Placeholder]</h3>
        {loading ? <p>Loading events...</p> : (
          <ul>
            {events.map((event, index) => (
              <li key={index} style={{ color: event.type === 'holiday' ? 'darkblue' : 'darkgreen' }}>
                <strong>{event.title}</strong>: {event.start.toLocaleDateString()}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CalendarPage;