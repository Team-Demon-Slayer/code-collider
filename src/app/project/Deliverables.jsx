"use client";

import React from "react";

export default function Deliverables({ deliverables }) {
  return (
    <div>
      {deliverables[0].tasks.map((task) => {
        return (
          <div key={task.task_id}>
            <p>{task.title}</p>
            <p></p>
          </div>
        );
      })}
    </div>
  );
}
