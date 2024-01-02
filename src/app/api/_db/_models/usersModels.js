const db = require('../');

exports.getMiniUser = async (userId) => {
  let { data, error } = await db
    .from('users')
    .select(`
      id,
      username,
      is_mentor,
      profile_photo
    `)
    .eq('id', userId);

  if(error) {
    console.error(error);
  }

  return data[0];
}

exports.getExpandedUser = async (userId) => {
  let { data, error } = await db
    .from('users')
    .select(`
      id,
      username,
      bio,
      experience,
      is_mentor,
      profile_photo,
      languages(name,url)
    `)
    .eq('id', userId);

  if(error) {
    console.error(error);
  }

  return data[0];
}