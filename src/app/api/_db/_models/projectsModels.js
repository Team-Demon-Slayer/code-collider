import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const supabase = createClientComponentClient();

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
      upvotes(user_id)
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
