import supabase from "../index.js";

const supabaseAuth = require("../");
import { format, addDays, eachDayOfInterval, interval } from "date-fns";

export const getProject = async (projectId) => {
  let { data, error } = await supabase
    .from("projects")
    .select(
      `
      id,
      title,
      owner(id,username),
      languages(name,url),
      description,
      max_developers,
      users!projects_users(id,username),
      repo_link,
      start_date,
      finish_date,
      mentor(id,username),
      active,
      available_spots,
      upvotes(count)
      `
    )
    //For project scope, use differenceInDays(start_date, finish_date) from date-fns
    .eq("id", projectId);

  if (error) {
    console.error(error);
  }

  return data[0];
};

export const getProjectPage = async (
  page = 1,
  count = 10,
  active,
  sortingMethod = ["start_date", { ascending: false }]
) => {
  let rangeStart = (page - 1) * count;
  let rangeEnd = rangeStart + (count - 1);
  let { data, error } = await supabase
    .from("projects")
    .select(
      `
      id,
      title,
      owner(id,username),
      languages(name,url),
      description,
      max_developers,
      users!projects_users(id,username),
      start_date,
      finish_date,
      mentor(id,username),
      active,
      repo_link,
      available_spots,
      upvotes(count)
    `
    )
    .eq("active", active === undefined ? true || false : active)
    .order(sortingMethod[0], sortingMethod[1])
    .range(rangeStart, rangeEnd);

  if (error) {
    console.error(error);
  }
  return data;
};

export const getProjectPageByLanguage = async (
  page = 1,
  count = 10,
  active,
  languages,
  sortingMethod = [
    "start_date",
    { referencedTable: "projects", ascending: false },
  ]
) => {
  let rangeStart = (page - 1) * count;
  let rangeEnd = rangeStart + (count - 1);
  let { data, error } = await supabase
    .from("languages")
    .select(
      `
      url,
      projects(
        id,
        title,
        owner(id,username),
        languages(name,url),
        description,
        max_developers,
        users!projects_users(id,username),
        start_date,
        finish_date,
        mentor(id,username),
        active,
        available_spots,
        upvotes(count)
      )
    `
    )
    .in("url", languages)
    .eq("projects.active", active === undefined ? true || false : active)
    .order(sortingMethod[0], sortingMethod[1], { referencedTable: "projects" })
    .range(rangeStart, rangeEnd, { referencedTable: "projects" });

  if (error) {
    console.error(error);
  }
  return data;
};

export const getMyProjects = async (userId) => {
  const { data, error } = await supabase
    .from("users")
    .select(
      `
      projects!projects_users(
        id,
        title,
        owner(id,username),
        languages(name,url),
        description,
        max_developers,
        users!projects_users(id,username),
        start_date,
        finish_date,
        mentor(id,username),
        active,
        available_spots,
        upvotes(count)
      )
    `
    )
    .eq("id", userId)
    .order("start_date", { referencedTable: "projects", ascending: false });

  if (error) {
    console.error(error);
  }

  return data;
};

export const getMyMentorProjects = async (userId) => {
  const { data, error } = await supabase
    .from("users")
    .select(
      `
      projects!projects_mentor_fkey(
        id,
        title,
        owner(id,username),
        languages(name,url),
        description,
        max_developers,
        users!projects_users(id,username),
        start_date,
        finish_date,
        mentor(id,username),
        active,
        available_spots,
        upvotes(count)
      )
    `
    )
    .eq("id", userId)
    .order("start_date", { referencedTable: "projects", ascending: false });

  if (error) {
    console.error(error);
  }

  return data;
};

export const joinProject = async (projectId) => {
  const { data: user, error: err1 } = await supabaseAuth.auth.getUser();

  if (err1) {
    console.error(err1);
  }

  const user_id = user?.user?.id;

  const { data: project, error: err2 } = await supabase
    .from("projects")
    .select()
    .eq("id", projectId);

  if (err2) {
    console.error(err2);
  }

  const project_id = project[0]?.id;

  const start = addDays(project[0].start_date, 1);
  const finish = addDays(project[0].finish_date, 1);

  const formatted = eachDayOfInterval(interval(start, finish)).map((date) =>
    format(date, "yyyy'-'LL'-'dd")
  );

  const { data: isBusy, error: err3 } = await supabase
    .from("busy_dates")
    .select()
    .eq("user_id", user_id)
    .in("date", formatted);

  const activeDates = formatted.map((date) => {
    return { date, project_id, user_id };
  });

  if (isBusy.length) {
    throw new Error("User is busy during this project.");
    return;
  }

  const { error: err4 } = await supabase.from("busy_dates").insert(activeDates);

  if (err4) {
    console.error(err4);
    throw new Error("Could not insert busy days.");
    return;
  }

  const { error: err5 } = await supabase
    .from("projects_users")
    .insert({ project_id, user_id });

  if (err5) {
    console.error(err5);
    throw new Error("Could not add user to project.");
    return;
  }

  return { user, project };
};

export const getCurrentProject = async (userId) => {
  const today = format(new Date(), "yyyy'-'LL'-'dd");
  const { data, error } = await supabase
    .from("users")
    .select(
      `
      busy_dates(
        projects(
          id,
          title,
          owner(id,username),
          languages(name,url),
          description,
          max_developers,
          users!projects_users(id,username),
          start_date,
          finish_date,
          mentor(id,username),
          active,
          available_spots,
          upvotes(count),
          repo_link
        )
      )
    `
    )
    .eq("id", userId)
    .eq("busy_dates.date", today);

  if (error) {
    console.error(error);
    return;
  }

  return data;
};

export const getFilteredProjectsPageByLanguage = async (
  language,
  active,
  page = 1,
  count = 10,
  spots,
  gtDate,
  ltDate,
  mentor,
  search
) => {
  let rangeStart = (page - 1) * count;
  let rangeEnd = rangeStart + (count - 1);
  if (!language) {
    throw new Error("Need a language for language based query!");
    return;
  }

  const searchFilter = search == null ? [""] : ['projects.title', `%${search}%`]
  const activeFilter = ["projects.active", active];
  const languageFilter = ["url", language];
  const spotsFilter =
    spots === undefined || spots === null
      ? [""]
      : ["projects.available_spots", spots];
  const spotsFilter2 =
    active === true && !(mentor === true)
      ? ["projects.available_spots", 0]
      : [""];
  const gtDateFilter = gtDate == null ? [""] : ["projects.start_date", gtDate];
  const ltDateFilter = ltDate == null ? [""] : ["projects.finish_date", ltDate];
  const mentorFilter = mentor === true ? ["projects.mentor", null] : [""];
  const { data, error } = await supabase
    .from("languages")
    .select(
      `
      projects(
        id,
        title,
        owner(id,username),
        languages(name,url),
        description,
        max_developers,
        users!projects_users(id,username),
        start_date,
        finish_date,
        mentor(id,username),
        active,
        available_spots,
        upvotes(count)
      )
    `
    )
    .eq(...languageFilter)
    .eq(...activeFilter)
    .eq(...spotsFilter)
    .gt(...spotsFilter2)
    .gt(...gtDateFilter)
    .lt(...ltDateFilter)
    .is(...mentorFilter)
    .ilike(...searchFilter)
    .order("start_date", { referencedTable: "projects", ascending: true })
    .range(rangeStart, rangeEnd, { referencedTable: "projects" });

  if (error) {
    console.error(error);
    return;
  }

  return data;
};

export const getFilteredProjectsPage = async (
  active,
  page = 1,
  count = 10,
  spots,
  gtDate,
  ltDate,
  mentor,
  search
) => {
  let rangeStart = (page - 1) * count;
  let rangeEnd = rangeStart + (count - 1);


  const searchFilter = search == null ? [""] : ['title', `%${search}%`]
  const activeFilter = ["active", active];
  const spotsFilter =
    spots === undefined || spots === null ? [""] : ["available_spots", spots];
  const spotsFilter2 =
    active === true && !(mentor === true) ? ["available_spots", 0] : [""];
  const gtDateFilter = gtDate == null ? [""] : ["start_date", gtDate];
  const ltDateFilter = ltDate == null ? [""] : ["finish_date", ltDate];
  const mentorFilter = mentor === true ? ["mentor", null] : [""];
  const { data, error } = await supabase
    .from("projects")
    .select(
      `
      id,
      title,
      owner(id,username),
      languages(name,url),
      description,
      max_developers,
      users!projects_users(id,username),
      start_date,
      finish_date,
      mentor(id,username),
      active,
      available_spots,
      upvotes(count)
    `
    )
    .eq(...activeFilter)
    .eq(...spotsFilter)
    .gt(...spotsFilter2)
    .gt(...gtDateFilter)
    .lt(...ltDateFilter)
    .is(...mentorFilter)
    .ilike(...searchFilter)
    .order("start_date")
    .range(rangeStart, rangeEnd);

  if (error) {
    console.error(error);
    return;
  }

  return data;
};
