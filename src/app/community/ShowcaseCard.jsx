"use client";

import { useRouter } from "next/navigation";
import supabase from "../api/_db/index.js";
import useCommunityContext from "./useCommunityContext";
import { useState, useEffect } from "react";
import "../_stylesheets/currentProjectStyle.css";

const testIfUpvoted = (userUpvotes, projectId) => {
  if (!userUpvotes) return false;
  return userUpvotes.some(({ project_id }) => project_id === projectId);
};

export default function ProjectCard({ project, userUpvotes }) {
  const router = useRouter();
  const { user } = useCommunityContext();
  const [upvoted, setUpvoted] = useState(true);
  const [upvoteCount, setUpvoteCount] = useState(project.upvotes[0].count);
  const [isUpvoteLoading, setIsUpvoteLoading] = useState(true);

  useEffect(() => {
    setUpvoted(testIfUpvoted(userUpvotes, project.id));
    if (userUpvotes && project) {
      setIsUpvoteLoading(false);
    }
  }, [userUpvotes, project]);

  const handleViewProject = async () => {
    router.push(`/project/${project.id}`);
  };

  const handleUpvoteProject = async () => {
    await supabase
      .from("upvotes")
      .insert({ project_id: project.id, user_id: user.id });
    setUpvoted(true);
    setUpvoteCount(upvoteCount + 1);
  };

  return (
    <div className="current-project-details-info">
      <div className="project-card-head">
        <div className="project-details-title">
          <div className="project-details-current-project">
            {project.title} - @{project.owner.username}
          </div>
        </div>
        <div className="project-spot">{upvoteCount} upvotes</div>
      </div>
      <div className="languages-current">
        {project.languages.map(({ url, name }) => {
          return (
            <img
              alt={name}
              key={url}
              src={`https://skillicons.dev/icons?i=${url}`}
              className="language-icon"
            />
          );
        })}
      </div>

      <div className="project-details-description">{project.description}</div>

      <div className="project-details-footer">
        <div className="project-details-team">
          {project.users?.map(({ username, id }, index) => {
            return (
              <div className="team-member" key={id}>
                @{username}
                {index === project.registeredDevelopers - 1 ? "" : " |"}
              </div>
            );
          })}
        </div>
        <div className="project-showcase-buttons">
          <button onClick={handleViewProject} className="project-join-btn">
            View Project
          </button>
          {!isUpvoteLoading &&
            (upvoted ? (
              <button className="project-upvote-button" disabled>
                ✅
              </button>
            ) : (
              <button
                onClick={handleUpvoteProject}
                className="project-upvote-button"
              >
                Upvote
              </button>
            ))}
        </div>
      </div>
    </div>
  );
}

// set a min height for the card. 300px;
// Peginaton data: tell me how many projects are there in total, or how many pages are there in total.
// turn on / off the mentorship
