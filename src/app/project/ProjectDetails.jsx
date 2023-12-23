"use client";

import React from "react";

export default function ProjectDetails({ project_meta }) {
  return (
    <div className="project-details-info">
      <div className="project-details-title">
        <h2>{project_meta.title}</h2>
        <p>@{project_meta.owner}</p>
      </div>
      <div className="languages">
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
    </div>
  );
}