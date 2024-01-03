"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Carousel from "../_components/Carousel.jsx";
import "./myProjects.css";

export default function UserProjects({ currentProjects, pastProjects }) {
  const router = useRouter();

  const [navToSelected, setNavToSelected] = useState(null);

  const navToProject = (obj) => {
    router.push(`/project/${obj.id}`);
  };

  return (
    <div className="my-projects-container">
      {currentProjects && (
        <Carousel
          projects={currentProjects}
          getProject={navToProject}
          header="Current Projects"
        />
      )}

      <div id="my-projects-split" />

      {pastProjects && (
        <Carousel
          projects={pastProjects}
          getProject={navToProject}
          header="Past Projects"
        />
      )}
    </div>
  );
}
