const { createClientComponentClient } = require("@supabase/auth-helpers-nextjs");
const supabase = createClientComponentClient();

const supabaseAuth = require('../');
import { format, addDays, eachDayOfInterval, interval } from 'date-fns';

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
      upvotes(count)
    `
    )
    .eq("active", active === undefined ? true || false : active)
    .order(sortingMethod[0], sortingMethod[1])
    .range(rangeStart, rangeEnd);

  if (error) {
    console.error(error);
  }
  console.log(rangeStart, rangeEnd);
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
        upvotes
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
  console.log(rangeStart, rangeEnd);
  return data;
};

export const getMyProjects = async (userId) => {
  const { data, error } = await supabase
    .from('users')
    .select(`
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
        upvotes
      )
    `)
    .eq('id', userId)
    .order(
      "start_date",
      { referencedTable: "projects", ascending: false },
    );

    if (error) {
      console.error(error);
    }

    return data;
}

export const getMyMentorProjects = async (userId) => {
  const { data, error } = await supabase
    .from('users')
    .select(`
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
        upvotes
      )
    `)
    .eq('id', userId)
    .order(
      "start_date",
      { referencedTable: "projects", ascending: false },
    );

    if (error) {
      console.error(error);
    }

    return data;
}

export const joinProject = async (projectId) => {
  const {data: user, error: err1} = await supabaseAuth.auth.getUser();

  if(err1) {
    console.error(err1);
  }

  const user_id = user?.user?.id;

  const {data: project, error: err2} = await supabase
    .from('projects')
    .select()
    .eq('id', projectId);

  if(err2) {
    console.error(err2);
  }

  const project_id = project[0]?.id;

  const start = addDays(project[0].start_date, 1);
  const finish = addDays(project[0].finish_date, 1);
  console.log('Dates: ' + start, finish);

  const formatted = eachDayOfInterval(interval(start, finish))
    .map((date) => format(date, "yyyy'-'LL'-'dd"));

  console.log('Formatted: ' + formatted)

  const {data: isBusy, error: err3} = await supabase
    .from('busy_dates')
    .select()
    .eq('user_id', user_id)
    .in('date', formatted);

  const activeDates = formatted.map((date) => {date, project_id, user_id})


  console.log(activeDates);
  console.log(isBusy);

  return {user, project};
}