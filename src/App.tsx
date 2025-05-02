import "./App.css";
import { useState } from "react";
function App() {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [today, setToday] = useState(new Date().toLocaleDateString());
  const daysInMonth = new Date(currentYear, currentMonth , 0).getDate();
  const [notes, setNotes] = useState({});

  const addNotes = (note: string) => {
    setNotes(note);
    window.localStorage.setItem("notes", JSON.stringify(notes));
  };

  function next() {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
    setToday(new Date(currentYear, currentMonth + 1, 1).toLocaleDateString());
  }
  function previous() {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
    setToday(new Date(currentYear, currentMonth - 1, 1).toLocaleDateString());
  }

  return (
    <div>
      <div>
        <button onClick={previous}>PREVIOUS</button>
        <h1>{today}</h1>
        <button onClick={next}>NEXT</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Sunday</th>
            <th>Monday</th>
            <th>Tuesday</th>
            <th>Wednesday</th>
            <th>Thursday</th>
            <th>
              Friday<sup>🤲</sup>
            </th>
            <th>Saturday</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 6 }, (_, weekIndex) => (
            <tr key={weekIndex}>
              {Array.from({ length: 7 }, (_, dayIndex) => {
                const firstDayOfMonth = new Date(
                  currentYear,
                  currentMonth,
                  1
                ).getDay();
                const day = weekIndex * 7 + dayIndex - firstDayOfMonth + 1;
                return (
                  <td key={dayIndex}  >
                    {day > 0 && day <= daysInMonth ? day  : ""} 
                    
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
