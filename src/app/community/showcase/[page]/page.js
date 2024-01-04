'use client';

import { useEffect, useState } from 'react';
import {
  getProjectPage,
  getProjectPageByLanguage
} from '@/app/api/_db/_models/projectsModels';
import useCommunityContext from '../../useCommunityContext';
import { getExpandedUser } from '@/app/api/_db/_models/usersModels';
import ShowcaseCard from '../../ShowcaseCard';
import Pagination from '../../Pagination';

export default function ShowcasePage({ params: { page } }) {
  const [isLoading, setIsLoading] = useState(false);
  const [projects, setProjects] = useState([]);
  const [userUpvotes, setUserUpvotes] = useState([]);
  const { keyword, language, user, languageSelected, debouncedKeyword } =
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

  useEffect( () => { console.log(debouncedKeyword); }, [debouncedKeyword])// FIXME: remove

  return (
    <>
      <div className="page-container">
        {isLoading ? (
          <span className="loader"></span>
        ) : (
          projects.map(p => <ShowcaseCard key={p.id} project={p} userUpvotes={userUpvotes} />)
        )}
      </div>
      <Pagination pages={5} />
    </>
  );
}
