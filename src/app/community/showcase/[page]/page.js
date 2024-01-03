'use client';

import { useEffect, useState } from 'react';
import {
  getProjectPage,
  getProjectPageByLanguage
} from '@/app/api/_db/_models/projectsModels';
import useCommunityContext from '../../useCommunityContext';
// import { projects, query } from '../../temp-fake-data';
import ShowcaseCard from '../../ShowcaseCard';

export default function ShowcasePage({ params: { page } }) {
  const [isLoading, setIsLoading] = useState(false);
  const [projects, setProjects] = useState([]);
  const { keyword, language, spots, startDate, openMentor, user } =
    useCommunityContext();
  useEffect(() => {
    async function getprojects() {
      setIsLoading(true);
      console.log({page}); // FIXME: test
      const projects = await getProjectPage(page, 10, false);
      console.log(projects); // FIXME: test
      setProjects(projects);
      setIsLoading(false);
    }
    getprojects();
  }, [page]);
  return (
    <>
      <div className="page-container">
        {isLoading ? (
          <span className="loader"></span>
        ) : (
          projects.map(p => <ShowcaseCard key={p.if} project={p} />)
        )}
      </div>
    </>
  );
}
