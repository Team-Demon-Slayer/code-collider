'use client';

import { useEffect, useState } from 'react';
import {
  getFilteredProjectsPage,
  getFilteredProjectsPageByLanguage
} from '@/app/api/_db/_models/projectsModels';
import useCommunityContext from '../../useCommunityContext';
import ProjectCard from '../../ProjectCard';
import Pagination from '../../Pagination';

export default function BrowsePage({ params: { page } }) {
  const [isLoading, setIsLoading] = useState(false);
  const [projects, setProjects] = useState([]);
  const {
    keyword,
    language,
    spots,
    startDate,
    openMentor,
    user,
    languageSelected,
    debouncedKeyword,
    selectedLanguage
  } = useCommunityContext();

  const convertedSpot = spots === '' ? null : spots;
  const convertedStartDate = startDate === '' ? null : startDate;

  useEffect(() => {
    async function getprojects() {
      setIsLoading(true);
      if (languageSelected && selectedLanguage.length > 0) {
        const projects = await getFilteredProjectsPageByLanguage(
          selectedLanguage,
          true,
          parseInt(page),
          10,
          convertedSpot,
          convertedStartDate,
          null,
          openMentor
        );
        console.log({ projects }); // FIXME: remove
        setProjects(projects[0].projects);
      } else {
        const projects = await getFilteredProjectsPage(
          true,
          parseInt(page),
          10,
          convertedSpot,
          convertedStartDate,
          null,
          openMentor
        );
        console.log({ projects }); // FIXME: removeß
        setProjects(projects);
      }
      setIsLoading(false);
    }
    getprojects();
  }, [
    page,
    selectedLanguage,
    languageSelected,
    convertedSpot,
    startDate,
    openMentor,
    convertedStartDate
  ]);

  useEffect(() => {
    console.log(debouncedKeyword);
  }, [debouncedKeyword]); // FIXME: remove

  console.log({startDate}) // FIXME: remove
  return (
    <>
      <div className="page-container">
        {isLoading ? (
          <span className="loader"></span>
        ) : (
          projects?.map(p => <ProjectCard key={p.id} project={p} />)
        )}
      </div>
      <Pagination pages={5} />
    </>
  );
}
