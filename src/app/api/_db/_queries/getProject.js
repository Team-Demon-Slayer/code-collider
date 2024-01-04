// const db = require("../index.js");
import supabase from "../index.js";

export const getProjects = async (projectId) => {
  let { data, error } = await supabase
    .from("projects")
    .select(
      `
      id,
      title,
      owner(id,username),
      languages(name,url),
      description,
      users!projects_users(id,username),
      repo_link,
      mentor(id,username)
    `
    )
    .eq("id", projectId);

  if (error) {
    console.error(error);
  }

  return data;
};
