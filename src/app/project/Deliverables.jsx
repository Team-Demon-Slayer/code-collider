"use client";

import React from "react";

export default function Deliverables({ deliverables }) {
  return (
    <div>
      {deliverables.map((day) => {
        <div className="deliverables-day">
          {day.tasks.map((task) => {
            return (
              <div key={task.task_id}>
                <p>{task.date}</p>
                <p></p>
              </div>
            );
          })}
        </div>;
      })}
    </div>
  );
}
