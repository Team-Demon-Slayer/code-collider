"use client";

import "./myProjects.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Carousel from "../_components/Carousel.jsx";

export default function UserProjects({ currentProjects, pastProjects }) {
  const router = useRouter();

  const [navToSelected, setNavToSelected] = useState(null);

  const navToProject = (obj) => {
    router.push(`/project/${obj.id}`);
  };

  console.log(pastProjects);

  return (
    <div className="my-projects-container">
      <div className="my-current-projects">
        <div className="my-current-projects-header">My Current Projects</div>
        {currentProjects ? (
          <Carousel
            projects={currentProjects}
            getProject={navToProject}
            header="Current Project"
          />
        ) : (
          <div className="no-my-projects">No Current Projects</div>
        )}
      </div>

      <div id="my-projects-split" />
      <div className="my-current-projects">
        <div className="my-current-projects-header">My Past Projects</div>
        {pastProjects.length > 0 ? (
          <Carousel
            projects={pastProjects}
            getProject={navToProject}
            header="Past Project"
          />
        ) : (
          <div className="no-my-projects">No Past Projects</div>
        )}
      </div>
    </div>
  );
}
