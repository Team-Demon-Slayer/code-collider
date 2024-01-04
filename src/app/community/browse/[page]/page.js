'use client';

import { useEffect, useState } from 'react';
import {
  getProjectPage,
  getProjectPageByLanguage
} from '@/app/api/_db/_models/projectsModels';
import useCommunityContext from '../../useCommunityContext';
// import { projects, query } from '../../temp-fake-data';
import ProjectCard from '../../ProjectCard';
import Pagination from '../../Pagination';

export default function BrowsePage({ params: { page } }) {
  const [isLoading, setIsLoading] = useState(false);
  const [projects, setProjects] = useState([]);
  const { keyword, language, spots, startDate, openMentor, user } =
    useCommunityContext();
  useEffect(() => {
    async function getprojects() {
      setIsLoading(true);
      const projects = await getProjectPage(page, 10, true);
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
          projects.map(p => <ProjectCard key={p.if} project={p} />)
        )}
      </div>
      <Pagination pages={5} />
    </>
  );
}
