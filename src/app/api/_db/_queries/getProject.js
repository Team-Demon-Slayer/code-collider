const db = require('../');

module.exports = getProjects = async (projectId) => {
  let { data, error } = await db
    .from('projects')
    .select(`
      id,
      title,
      owner(id,username),
      languages(name,url),
      description,
      users!projects_users(id,username),
      repo_link,
      mentor(id,username)
    `)
    .eq('id', projectId);

  if(error) {
    console.error(error);
  }

  return data;
}