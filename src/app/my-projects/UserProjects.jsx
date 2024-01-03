"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Carousel from "../_components/Carousel.jsx";
import "./myProjects.css";

export default function UserProjects({ data }) {
  const router = useRouter();
  
  const [currentProjects, setCurrentProjects] = useState(null);
  const [pastProjects, setSpotPastProjects] = useState(null);
  const [navToSelected, setNavToSelected] = useState(null);

  const getCurrentProjects = () => {
    const current = data.filter((project) => {
      return project.active;
    });
    setCurrentProjects(current);
  };

  const getPastProjects = () => {
    const past = data.filter((project) => {
      return !project.active;
    });
    setSpotPastProjects(past);
  };

  const navToProject = (obj) => {
    router.push(`/project/${obj.project_id}`);
  };

  useEffect(() => {
    getCurrentProjects();
    getPastProjects();
  }, [data]);

  return (
    currentProjects &&
    pastProjects && (
      <div className="my-projects-container">
        {/* <Carousel
          projects={currentProjects}
          getProject={navToProject}
          header="Current Projects"
        /> */}

        <div id="my-projects-split" />
{/*
        <Carousel
          projects={pastProjects}
          getProject={navToProject}
          header="Past Projects"
        /> */}
      </div>
    )
  );
}
