"use client";
import "./globals.css";
import hpMockData from "./my-projects/hpMockData.js";
import mockData from "./project/[projectId]/mock-data";
import HomePage from "./_components/HomePage.jsx";
import { getProjectPage, getCurrentProject } from "./api/_db/_models/projectsModels.js";
import { useState, useEffect } from "react"
import supabase from "./api/_db/index.js";

export default function Home() {
  const [recentProjects, setRecentProjects] = useState(null);
  const [spotlightProjects, setSpotlightProjects] = useState(null);
  const [currentProject, setCurrentProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const getRecentProjects = async () => {
    const data = await getProjectPage();
    setRecentProjects(data);
  };

  const getSpotlightProjects = async () => {
    const data = await getProjectPage(1, 10, false);
    setSpotlightProjects(data);
  };

  const selectCurrentProject = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    console.log(user.id);
    const data = await getCurrentProject(user.id);
    console.log(data);
    setCurrentProject(data[0].busy_dates[0]);
  };

  useEffect(() => {
    const getProjects = async () => {
      await getRecentProjects();
      await getSpotlightProjects();
      await selectCurrentProject();
      setIsLoading(false);
    }
    getProjects();
  }, []);

  return (
    <main className="main-container">
      {(isLoading) ? ( <span className="loader"></span> ) : (
        <HomePage recentProjects={recentProjects} spotlightProjects={spotlightProjects} currentProject={currentProject} />
      )}
    </main>
  );
}
