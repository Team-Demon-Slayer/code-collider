CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v1(),
  username varchar(255),
  is_mentor BOOLEAN NOT NULL DEFAULT FALSE,
  experience varchar(255) NOT NULL,
  profile_photo varchar(255),
  bio varchar(500)
  --...auth related fields TBD
);

CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v1(),
  title varchar(32) NOT NULL,
  owner UUID REFERENCES users(id) NOT NULL,
  start_date DATE NOT NULL DEFAULT CURRENT_DATE,
  finish_date DATE NOT NULL,
  estimated_hours INT NOT NULL,
  description varchar(500),
  repo_link varchar(255),
  mentor UUID REFERENCES users(id),
  max_developers INT NOT NULL DEFAULT 5,
  active BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS languages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v1(),
  name varchar(32) NOT NULL,
  url varchar(32) NOT NULL,
  UNIQUE (url),
  UNIQUE (name)
);

CREATE TABLE IF NOT EXISTS users_languages (
  user_id UUID REFERENCES users(id) NOT NULL,
  language_id UUID REFERENCES languages(id) NOT NULL,
  PRIMARY KEY (user_id, language_id)
);

CREATE TABLE IF NOT EXISTS projects_languages (
  project_id UUID REFERENCES projects(id) NOT NULL,
  language_id UUID REFERENCES languages(id) NOT NULL,
  PRIMARY KEY(project_id, language_id)
);

CREATE TABLE IF NOT EXISTS projects_users (
  project_id UUID REFERENCES projects(id) NOT NULL,
  user_id UUID REFERENCES users(id) NOT NULL,
  PRIMARY KEY (project_id, user_id)
);

CREATE TABLE IF NOT EXISTS deliverables (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v1(),
  project_id UUID REFERENCES projects(id) NOT NULL,
  date DATE NOT NULL,
  title varchar(255) NOT NULL,
  description varchar(255),
  owner UUID REFERENCES users(id),
  complete BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v1(),
  project_id UUID REFERENCES projects(id) NOT NULL,
  posted_by UUID REFERENCES users(id) NOT NULL,
  posted_date DATE NOT NULL DEFAULT CURRENT_DATE,
  text varchar(255)
);

