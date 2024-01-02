'use client';

import { useEffect } from 'react';
import useCommunityContext from '../../useCommunityContext';
import { projects, query } from '../../temp-fake-data';
import ProjectCard from '../../ProjectCard';

export default function BrowsePage({ params: { page } }) {
  const { keyword, language, spots, startDate, openMentor, user, storeUserDataFromSupabase } =
    useCommunityContext();

  useEffect(() => {
    if(!user) {
      storeUserDataFromSupabase();
    }
  }, [user, storeUserDataFromSupabase]);
  return (
    <div>
      <div className="page-container">
        {query(projects, keyword, language, spots, openMentor).map(
          p => (
            <ProjectCard key={p.title} project={p} />
          )
        )}
      </div>
      {JSON.stringify(user)}
    </div>
  );
}
