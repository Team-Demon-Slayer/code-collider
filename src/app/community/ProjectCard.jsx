'use client';
import '../_stylesheets/currentProjectStyle.css';

export default function ProjectCard({ project }) {
  return (
    <div className="current-project-details-info">
      <div className="project-details-title">
        <div className="project-details-current-project">
          {project.title} - @{project.registeredDevelopers[0].name}
        </div>
      </div>
      <div className="languages-current">
        {project.languages.map(language => {
          return (
              <img alt={language.badge_url} key={language.badge_url} src={language.badge_url} className="language-icon" />
          );
        })}
      </div>

      <div className="project-details-description">{project.content}</div>

      <div className="project-details-footer">
        <div className="project-details-team">
          {project.registeredDevelopers.map(({ name, id }, index) => {
            return (
              <div className="team-member" key={id}>
                @{name}
                {index === project.registeredDevelopers - 1 ? '' : ' |'}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
