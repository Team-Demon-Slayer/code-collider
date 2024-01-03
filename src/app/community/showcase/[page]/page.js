'use client';

import useCommunityContext from '../../useCommunityContext';
import { projects, query } from '../../temp-fake-data';
import ProjectCard from '../../ProjectCard';

export default function ShowcasePage({ params: { page } }) {
  const {
    keyword,
    language,
    spots,
    startDate,
    openMentor,
    user,
  } = useCommunityContext();
  return (
    <div className="page-container">
      <div>
        {query(projects, keyword, language, spots, openMentor).map(p => (
          <ProjectCard key={p.title} project={p} />
        ))}
      </div>
      {JSON.stringify(user)}
    </div>
  );
}
