"use client";
import "../globals.css";
import { useState, useEffect } from "react";
import Carousel from "./Carousel.jsx";
import CurrentProject from "./CurrentProject.jsx";

export default function HomePage({ data, currentProject }) {
  const [recentProjects, setRecentProjects] = useState(null);
  const [spotlightProjects, setSpotlightProjects] = useState(null);

  const getRecent = () => {
    const recent = data.filter((project) => {
      return project.active && project.max_size - project.team > 0;
    });
    setRecentProjects(recent);
  };

  const getSpotlight = () => {
    const spotlight = data.filter((project) => {
      return !project.active;
    });
    setSpotlightProjects(spotlight);
  };

  useEffect(() => {
    getRecent();
    getSpotlight();
  }, [data]);

  return (
    recentProjects &&
    spotlightProjects && (
      <div className="home-container">
        <div className="hp-banner">
        <CurrentProject project_meta={currentProject} />
        </div>

        <Carousel projects={recentProjects} header="Recently Added" />

        <Carousel projects={spotlightProjects} header="Spotlight Project" />
      </div>
    )
  );
}
