"use client";
import "../globals.css";
import { useState, useEffect } from "react";
import Carousel from "./Carousel.jsx";
import CurrentProject from "./CurrentProject.jsx";
import ProjectModal from "./ProjectModal.jsx";

export default function HomePage({ data, currentProject }) {
  const [recentProjects, setRecentProjects] = useState(null);
  const [spotlightProjects, setSpotlightProjects] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectProject, setSelectProject] = useState(null);

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

  const getProject = (obj) => {
    setSelectProject(obj);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
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
        {showModal && (
          <ProjectModal project={selectProject} closeModal={closeModal} />
        )}
        <Carousel
          projects={recentProjects}
          getProject={getProject}
          header="Recently Added"
        />
        <Carousel
          projects={spotlightProjects}
          getProject={getProject}
          header="Spotlight Project"
        />
      </div>
    )
  );
}
