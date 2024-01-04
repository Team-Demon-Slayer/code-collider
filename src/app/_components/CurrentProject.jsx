"use client";

import "../_stylesheets/currentProjectStyle.css";
import React from "react";
import { useRouter } from "next/navigation";

export default function CurrentProject({ currentProject }) {
  const router = useRouter();

  const navToProject = () => {
    router.push(`/project/${currentProject.id}`);
  };

  return (
    <>
      {currentProject ? (
        <div className="current-project-details-info">
          <div className="project-details-title">
            <div className="project-details-current-project">
              Current Project - {currentProject.title}
            </div>
          </div>
          <div className="languages-current">
            {currentProject.languages?.map((language) => {
              return (
                <img
                  src={`https://skillicons.dev/icons?i=${language.url}`}
                  key={language.url}
                  className="language-icon"
                />
              );
            })}
          </div>
          <div className="project-details-description">
            {currentProject.description}
          </div>

          <div className="project-details-footer">
            <div className="project-details-team">
              {currentProject.users?.map((member, index) => {
                return (
                  <div className="team-member" key={member.id}>
                    @{member.username}
                    {index === currentProject.users.length - 1 ? "" : " |"}
                  </div>
                );
              })}
            </div>
            <div className="project-details-page-btn" onClick={navToProject}>
              PROJECT PAGE
            </div>
            <a
              className="project-details-header-repo-btn"
              href={currentProject.repo_link}
              target="_blank"
            >
              PROJECT REPO
            </a>
          </div>
        </div>
      ) : (
        <div className="no-current-project"> No Current Project..</div>
      )}
    </>
  );
}
