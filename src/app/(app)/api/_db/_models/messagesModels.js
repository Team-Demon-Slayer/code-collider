import supabase from "../index.js";

export const getMessages = async (projectId) => {
  let { data, error } = await supabase
    .from("projects")
    .select(
      `
      messages(id,posted_by,posted_date,text)
    `
    )
    .eq("id", projectId);

  if (error) {
    console.error(error);
  }

  return data;
};
