"use client";

import React, { useState, useEffect } from "react";
import mockData from "./mock-data";
import Deliverables from "./Deliverables.jsx";
import MessageBoard from "./MessageBoard.jsx";
import ProjectDetails from "./ProjectDetails.jsx";

import "./style.css";

const { project_meta, deliverables, messages } = mockData;

export default function ProjectPage() {
  return (
    <div className="main-container">
      <div className="project-deliverables-link">
        <ProjectDetails project_meta={project_meta} />
        <Deliverables deliverables={deliverables} />
      </div>
      <MessageBoard messages={messages} project_meta={project_meta} />
    </div>
  );
}
