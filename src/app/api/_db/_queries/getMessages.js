// const db = require("../index.js");

const {
  createClientComponentClient,
} = require("@supabase/auth-helpers-nextjs");

const supabase = createClientComponentClient();

module.exports = getMessages = async (projectId) => {
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
