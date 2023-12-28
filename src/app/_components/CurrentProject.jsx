"use client";

import React from "react";
import "../_styleSheets/currentProjectStyle.css";
import { useRouter } from "next/navigation";

export default function CurrentProject({ project_meta }) {
  const router = useRouter();
  const navToProject = () => {
    router.push("/project");
  };
  return (
    <div className="current-project-details-info">
      <div className="project-details-title">
        <div className="project-details-current-project">
          Current Project - {project_meta.title}
        </div>
      </div>
      <div className="languages-current">
        {project_meta.languages.map((language) => {
          return (
            <div className="language-icon" key={language}>
              <img src={language} />
            </div>
          );
        })}
      </div>
      <div className="project-details-description">
        {project_meta.description}
      </div>

      <div className="project-details-footer">
        <div className="project-details-team">
          {project_meta.team.map((member, index) => {
            return (
              <div className="team-member" key={member}>
                @{member}
                {index === project_meta.team.length - 1 ? "" : " |"}
              </div>
            );
          })}
        </div>
        <button className="project-details-page-btn" onClick={navToProject}>PROJECT PAGE</button>
        <a
          className="project-details-header-repo-btn"
          href={project_meta.repo_link}
          target="_blank"
        >
          PROJECT REPO
        </a>
      </div>
    </div>
  );
}
