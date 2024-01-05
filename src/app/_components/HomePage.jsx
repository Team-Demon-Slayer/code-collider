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
    <div className="home-container">
      <CurrentProject currentProject={currentProject} />
      {showModal && (
        <ProjectModal project={selectProject} closeModal={closeModal} />
      )}
      {recentProjects ? (
        <Carousel
          projects={recentProjects}
          getProject={getProject}
          header="Recently Added"
        />
      ) : (
        <div className="no-projects">No Recent Projects</div>
      )}

      {spotlightProjects ? (
        <Carousel
          projects={spotlightProjects}
          getProject={getProject}
          header="Spotlight Project"
        />
      ) : (
        <div className="no-projects">No Spotlight Projects</div>
      )}
    </div>
  );
}
