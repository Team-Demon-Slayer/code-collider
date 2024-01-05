"use client";

import { useEffect, useState } from "react";
import {
  getProjectPage,
  getFilteredProjectsPage,
  getFilteredProjectsPageByLanguage,
} from "@/app/api/_db/_models/projectsModels";
import useCommunityContext from "../../useCommunityContext";
import { getExpandedUser } from "@/app/api/_db/_models/usersModels";
import supabase from "../../../api/_db/index";
import ShowcaseCard from "../../ShowcaseCard";
import Pagination from "../../Pagination";

export default function ShowcasePage({ params: { page } }) {
  const [isLoading, setIsLoading] = useState(false);
  const [projects, setProjects] = useState([]);
  const [userUpvotes, setUserUpvotes] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const {
    keyword,
    language,
    user,
    languageSelected,
    debouncedKeyword,
    selectedLanguage,
  } = useCommunityContext();

  useEffect(() => {
    async function getprojects() {
      setIsLoading(true);
      if (languageSelected && selectedLanguage.length > 0) {
        const projects = await getFilteredProjectsPageByLanguage(
          selectedLanguage,
          false,
          parseInt(page),
          10,
          null,
          null,
          null,
          false
        );
        setProjects(projects[0].projects);
      } else {
        const projects = await getFilteredProjectsPage(
          false,
          parseInt(page),
          10,
          null,
          null,
          null,
          false
        );
        setProjects(projects);
      }
      setIsLoading(false);
    }
    getprojects();
  }, [page, languageSelected, selectedLanguage]);

  useEffect(() => {
    async function getUserUpvotes() {
      if (user) {
        const expandedUser = await getExpandedUser(user?.id);
        setUserUpvotes(expandedUser.upvotes);
      }
    }
    getUserUpvotes();
  }, [user]);

  useEffect(() => {
    async function getPageCount() {
      const projectsCount = await supabase
        .from("projects")
        .select("id", { count: "exact", head: true })
        .eq("active", true);
      const pageCount = Math.ceil(projectsCount.count / 10);
      setPageCount(pageCount);
    }
    getPageCount();
  }, []);

  return (
    <>
      <div className="page-container">
        {isLoading ? (
          <span className="loader"></span>
        ) : (
          projects?.map((p) => (
            <ShowcaseCard key={p.id} project={p} userUpvotes={userUpvotes} />
          ))
        )}
      </div>
      <Pagination pages={pageCount} />
    </>
  );
}
