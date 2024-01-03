"use client";
import "./globals.css";
import hpMockData from "./my-projects/hpMockData.js";
import mockData from "./project/[projectId]/mock-data";
import HomePage from "./_components/HomePage.jsx";
import { getProjectPage } from "./api/_db/_models/projectsModels.js";
import { useState, useEffect } from "react"

export default function Home() {
  const [recentProjects, setRecentProjects] = useState(null);
  const [spotlightProjects, setSpotlightProjects] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const getRecentProjects = async () => {
    const data = await getProjectPage();
    setRecentProjects(data);
  };

  const getSpotlightProjects = async () => {
    const data = await getProjectPage(1, 10, false);
    setSpotlightProjects(data);
  };

  useEffect(() => {
    const getProjects = async () => {
      await getRecentProjects();
      await getSpotlightProjects();
      setIsLoading(false);
    }
    getProjects();
  }, []);

  return (
    <main className="main-container">
      {(isLoading) ? ( <span className="loader"></span> ) : (
        <HomePage recentProjects={recentProjects} spotlightProjects={spotlightProjects} currentProject={{}} />
      )}
    </main>
  );
}
