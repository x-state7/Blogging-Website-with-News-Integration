import './Calendar.css'

import React, { useState } from "react";
const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const monthOfYear = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "Aug",
  "September",
  "Oct",
  "Nov",
  "Dec"
]

const Calendar = () => {
  const currentDate = new Date()
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth())
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear())

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDate()
  console.log(currentMonth, currentYear, daysInMonth, firstDayOfMonth)

  const prevMonth = () => {
    // if current is january set it to december
    // else -1
    setCurrentMonth((prevMonth) => (prevMonth === 0 ? 11 : prevMonth - 1))
    setCurrentYear((prevYear) => (currentMonth === 0 ? prevYear - 1 : prevYear))
  }

  const nextMonth = () => {
    // if current is january set it to december
    // else -1
    setCurrentMonth((prevMonth) => (prevMonth === 11 ? 0 : prevMonth + 1))
    setCurrentYear((prevYear) => (currentMonth === 11 ? prevYear + 1 : prevYear))
  }

  return (
    <div className='calendar'>
      <div className="navigate-date">
        <h2 className='month'>{monthOfYear[currentMonth]},</h2>
        <h2 className='year'>{currentYear}</h2>
        <div className="buttons">
          <i onClick={prevMonth} className="bx bx-chevron-left"></i>
          <i onClick={nextMonth} className="bx bx-chevron-right"></i>
        </div>
      </div>
      <div className="weekdays">
        {daysOfWeek.map((day) => (
          <span key={day}>{day}</span>
        ))}
      </div>
      <div className="days">

        {[...Array(firstDayOfMonth).keys()].map((_, index) => (
          <span key={`empty-${index}`}></span>
        ))}

        {[...Array(daysInMonth).keys()].map((day) => (
          <span
            key={day + 1}
            className={
              day + 1 === currentDate.getDate() && currentMonth === currentDate.getMonth() &&
                currentYear === currentDate.getFullYear() ? 'current-day' : ""
            }
          >{day + 1}</span>
        ))}
      </div>
    </div>
  )
}
export default Calendar;