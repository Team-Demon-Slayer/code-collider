'use client';

export default function ProjectCard({ project }) {
  return (
    <div
      style={{
        border: '1px solid black',
        margin: '10px',
        padding: '10px',
      }}
    >
      <p>{project.title}</p>
      <ul>
        {project.languages.map(({ name, badge_url }) => (
          <li key={name}>
            <p>{name}</p> <img alt={name} url={badge_url} />
          </li>
        ))}
      </ul>
      <p>{project.content}</p>
    </div>
  );
}
