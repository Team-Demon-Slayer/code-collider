const db = require("../");

exports.getMessages = async (projectId) => {
  let { data, error } = await db
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
