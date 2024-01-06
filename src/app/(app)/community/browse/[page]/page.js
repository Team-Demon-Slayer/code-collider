"use client";

import { useEffect, useState } from "react";
import {
  getFilteredProjectsPage,
  getFilteredProjectsPageByLanguage,
} from "../../../api/_db/_models/projectsModels";
import useCommunityContext from "../../useCommunityContext";
import supabase from "../../../api/_db/index";
import ProjectCard from "../../ProjectCard";
import Pagination from "../../Pagination";

export default function BrowsePage({ params: { page } }) {
  const [isLoading, setIsLoading] = useState(false);
  const [projects, setProjects] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const {
    keyword,
    language,
    spots,
    startDate,
    openMentor,
    user,
    languageSelected,
    debouncedKeyword,
    selectedLanguage,
  } = useCommunityContext();

  const convertedSpot = spots === "" ? null : spots;
  const convertedStartDate = startDate === "" ? null : startDate;

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
          openMentor,
          debouncedKeyword
        );
        setProjects(projects[0].projects);
      } else {
        const projects = await getFilteredProjectsPage(
          true,
          parseInt(page),
          10,
          convertedSpot,
          convertedStartDate,
          null,
          openMentor,
          debouncedKeyword
        );
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
    convertedStartDate,
    debouncedKeyword,
  ]);

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
          projects?.map((p) => <ProjectCard key={p.id} project={p} />)
        )}
      </div>
      <Pagination pages={pageCount} />
    </>
  );
}
