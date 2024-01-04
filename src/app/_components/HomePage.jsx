"use client";
import "../globals.css";
import { useState, useEffect } from "react";
import Carousel from "./Carousel.jsx";
import CurrentProject from "./CurrentProject.jsx";
import ProjectModal from "./ProjectModal.jsx";

export default function HomePage({
  recentProjects,
  spotlightProjects,
  currentProject,
}) {
  const [showModal, setShowModal] = useState(false);
  const [selectProject, setSelectProject] = useState(null);

  const getProject = (obj) => {
    setSelectProject(obj);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

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
