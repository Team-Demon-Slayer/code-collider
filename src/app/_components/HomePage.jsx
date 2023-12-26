"use client";
import "../globals.css";
import {useState, useEffect} from "react";
import Carousel from "./Carousel.jsx";
import mockData from "../my-projects/hp-mockData.js";

export default function HomePage() {
  const [projects, setProjects] = useState(mockData || []);


  const resetProjects = (arr) => { setProjects(arr); }
  return (
    <main id="body">

      <div className="hp-banner">
        <h1>Current Project</h1>
      </div>
      <div className="hp-title"> {'Project: ' + mockData[0].title}</div>
      <br />
      <div>
        <Carousel resetProjects={resetProjects} projects={projects} header='Recently Added'/>
      </div>
      <br />
      <div>
        <Carousel resetProjects={resetProjects} projects={projects} header='Spotlight Project'/>
      </div>
    </main>
  );
}