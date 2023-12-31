import supabase from "../index.js";

export const getMiniUser = async (userId) => {
  let { data, error } = await supabase
    .from("users")
    .select(
      `
      id,
      username,
      is_mentor,
      profile_photo
    `
    )
    .eq("id", userId);

  if (error) {
    console.error(error);
  }

  return data[0];
};

export const getExpandedUser = async (userId) => {
  let { data, error } = await supabase
    .from("users")
    .select(
      `
      id,
      username,
      bio,
      experience,
      is_mentor,
      profile_photo,
      languages(name,url),
      upvotes(project_id)
    `
    )
    .eq("id", userId);

  if (error) {
    console.error(error);
  }

  return data[0];
};
