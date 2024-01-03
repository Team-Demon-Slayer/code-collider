'use client';

import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import useCommunityContext from './useCommunityContext';
import '../_stylesheets/currentProjectStyle.css';

export default function ProjectCard({ project }) {
  const router = useRouter();
  const { user } = useCommunityContext();
  const supabase = createClientComponentClient();
  const avaliableSpots =project.max_developers -  project.users.length;

  const getUserIdWithEmail = async email => {
    const { data, error } = await supabase
      .from('users')
      .select('id')
      .eq('email', email);
    if (error) {
      console.log(error);
    }
    return data[0].id;
  };

  const handleJoinProject = async () => {
    const userId = await getUserIdWithEmail(user.email);
    console.log(userId);
    await supabase
      .from('projects_users')
      .insert({ project_id: project.id, user_id: userId });
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
          <button className="project-mentor-button">Mentor Project</button>
        ) : (
          <button className="project-mentor-button" disabled>
            No Mentor
          </button>
        )}
        {avaliableSpots > 0 ? (
          <button
            onClick={handleJoinProject}
            className="project-details-page-btn"
          >
            Join Project
          </button>
        ) : (
          <button className="project-details-page-btn" disabled>
            Spots Full
          </button>
        )}
      </div>
    </div>
  );
}

// set a min height for the card. 300px;
// Peginaton data: tell me how many projects are there in total, or how many pages are there in total.
// turn on / off the mentorship
