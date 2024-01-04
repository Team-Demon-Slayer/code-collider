"use client";

import { useState, useEffect } from "react";
import supabase from '../api/_db/index.js';
import { getMyProjects } from '../api/_db/_models/projectsModels.js';
import UserProjects from "../my-projects/UserProjects.jsx";

export default function MyProjectsPage() {
  const [data, setData] = useState(null);
  const [currentProjects, setCurrentProjects] = useState([]);
  const [pastProjects, setPastProjects] = useState([]);

  const getSelectedProject = async (userId) => {
    const data = await getMyProjects(userId);
    const current = data[0]?.projects.filter(project => project.active === true);
    const past = data[0]?.projects.filter(project => project.active === false);
    setCurrentProjects(current);
    setPastProjects(past);
  }

  useEffect(() => {
    const getUserId = async () => {
      const { data , error } = await supabase.auth.getSession();
      if (error) {
        console.error(error);
        return;
      }
      await getSelectedProject(data.session.user.id);
    }
    getUserId();
  }, []);

  return (
   <UserProjects currentProjects={currentProjects} pastProjects={pastProjects}/>
  );
};