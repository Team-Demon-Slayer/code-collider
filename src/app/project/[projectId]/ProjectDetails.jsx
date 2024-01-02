"use client";

import React from "react";
import "./style.css";

export default function ProjectDetails({ project_meta }) {
  console.log("in component", project_meta);
  return (
    project_meta && (
      <div className="project-details-info">
        <div className="project-details-title">
          <h2>{project_meta.title}</h2>
          <p>@{project_meta.owner.username}</p>
        </div>
        <div className="languages">
          {project_meta.languages.map((language) => {
            return (
              <img
                src={`https://skillicons.dev/icons?i=${language.url}`}
                key={language.name}
                className="language-icon"
              />
            );
          })}
        </div>
        <div className="project-details-description">
          {project_meta.description}
        </div>
        <div className="project-details-team">
          {project_meta.users.map((member, index) => {
            return (
              <div className="team-member" key={member.id}>
                @{member.username}
                {index === project_meta.users.length - 1 ? "" : " |"}
              </div>
            );
          })}
        </div>
      </div>
    )
  );
}
