'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { joinProject } from '../api/_db/_models/projectsModels';
import useCommunityContext from './useCommunityContext';
import supabase from '../api/_db/index.js';
import '../_stylesheets/currentProjectStyle.css';

export default function ProjectCard({ project }) {
  const router = useRouter();
  const avaliableSpots = project.max_developers - project.users.length;

  const [joindisabled, setJoinDisabled] = useState(false);
  const { user } = useCommunityContext();

  const handleJoinProject = async () => {
    try {
      await joinProject(project.id);
      router.push(`/project/${project.id}`);
    } catch (error) {
      setJoinDisabled(true);
      toast.error(error.message);
    }
  };

  const handleMentorProject = async () => {
    await supabase
      .from('projects')
      .update({ mentor: user.id })
      .eq('id', project.id);
    router.push(`/project/${project.id}`);
  };

  return (
    <div className="current-project-details-info">
      <div className="project-card-head">
        <div className="project-details-title">
          <div className="project-details-current-project">
            {project.title} - @{project.owner.username}
          </div>
        </div>
        <div className="project-spot">{avaliableSpots} spots avaliable</div>
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
                {index === project.registeredDevelopers - 1 ? '' : ' |'}
              </div>
            );
          })}
        </div>
      </div>
      <div className="project-join-buttons">
        {project.mentor === null ? (
          <button
            onClick={handleMentorProject}
            className="project-mentor-button"
          >
            Mentor Project
          </button>
        ) : (
          <button className="project-mentor-button" disabled>
            Mentor Full
          </button>
        )}
        {avaliableSpots > 0 && !joindisabled ? (
          <button onClick={handleJoinProject} className="project-join-btn">
            Join Project
          </button>
        ) : (
          <button className="project-join-btn" disabled>
            Unable to Join
          </button>
        )}
      </div>
    </div>
  );
}

// set a min height for the card. 300px;
// Peginaton data: tell me how many projects are there in total, or how many pages are there in total.
// turn on / off the mentorship
