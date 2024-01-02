'use client';

import useCommunityContext from '../../useCommunityContext';
import { projects, query } from '../../temp-fake-data';
import ProjectCard from '../../ProjectCard';

export default function BrowsePage({ params: { page } }) {
  const { keyword, language, spots, startDate, openMentor } =
    useCommunityContext();
  return (
    <div>
      <div className="page-container">
        {query(projects, keyword, language, spots, openMentor).map(
          p => (
            <ProjectCard key={p.title} project={p} />
          )
        )}
      </div>
    </div>
  );
}
