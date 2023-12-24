'use client';

export default function ProjectCard({ project }) {
  return (
    <div className="project-details-info">
      <div className="project-details-title">
        <h2>{project.title}</h2>
        <p>@{project.registeredDevelopers[0].name}</p>
      </div>
      <div className="languages">
        {project.languages.map((language) => {
          return (
            <div className="language-icon" key={language.name}>
              <img src={language.badge_url} />
            </div>
          );
        })}
      </div>
      <div className="project-details-description">
        {project.content}
      </div>
      <div className="project-details-team">
        {project.registeredDevelopers.map(({name, id}, index) => {
          return (
            <div className="team-member" key={id}>
              @{name}
              {index === project.registeredDevelopers - 1 ? "" : " |"}
            </div>
          );
        })}
      </div>
    </div>
  );
}
