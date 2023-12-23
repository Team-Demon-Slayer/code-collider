'use client';

import useCommunityContext from '../../useCommunityContext';
import { projects, query } from '../../temp-fake-data';
import ProjectCard from '../../ProjectCard';

export default function ShowcasePage({ params: { page } }) {
  const { keyword, language, spots, startDate, openMentor } =
    useCommunityContext();
  return (
    <div>
      <div>
        ---
        <p>User requires page {page}</p>
        <p>User requires keyword: {keyword}</p>
        <p>User requires language {language}</p>
        <p>User requires spots {spots}</p>
        <p>User requires startDate {startDate?.toString()}</p>
        <p>{openMentor ? 'Open Mentor' : 'Not Open Mentor'}</p>
        ---
      </div>
      <div>
        {query(projects, keyword, language, spots, openMentor).map(
          p => (
            <ProjectCard key={p.title} project={p} />
          )
        )}
      </div>
    </div>
  );
}
