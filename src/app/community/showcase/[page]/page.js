'use client';

import { useEffect, useState } from 'react';
import {
  getProjectPage,
  getProjectPageByLanguage
} from '@/app/api/_db/_models/projectsModels';
import useCommunityContext from '../../useCommunityContext';
import { getExpandedUser } from '@/app/api/_db/_models/usersModels';
import ShowcaseCard from '../../ShowcaseCard';

export default function ShowcasePage({ params: { page } }) {
  const [isLoading, setIsLoading] = useState(false);
  const [projects, setProjects] = useState([]);
  const [userUpvotes, setUserUpvotes] = useState([]);
  const { keyword, language, spots, startDate, openMentor, user } =
    useCommunityContext();
  useEffect(() => {
    async function getprojects() {
      setIsLoading(true);
      const projects = await getProjectPage(page, 10, false);
      setProjects(projects);
      setIsLoading(false);
    }
    getprojects();
  }, [page]);

  useEffect(() => {
    async function getUserUpvotes() {
      if (user) {
        const expandedUser = await getExpandedUser(user?.id);
        setUserUpvotes(expandedUser.upvotes);
      }
    }
    getUserUpvotes();
  }, [user]);

  console.log({userUpvotes}); //FIXME: test
  console.log(user?.id); //FIXME: test
  return (
    <>
      <div className="page-container">
        {isLoading ? (
          <span className="loader"></span>
        ) : (
          projects.map(p => <ShowcaseCard key={p.id} project={p} userUpvotes={userUpvotes} />)
        )}
      </div>
    </>
  );
}
