CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username varchar(255),
  is_mentor BOOLEAN NOT NULL DEFAULT FALSE,
  experience varchar(255) NOT NULL,
  profile_photo varchar(255),
  bio varchar(500)
  --...auth related fields TBD
);

CREATE TABLE IF NOT EXISTS projects (
  id SERIAL PRIMARY KEY,
  title varchar(32) NOT NULL,
  owner INT REFERENCES users(id) NOT NULL,
  start_date DATE NOT NULL DEFAULT CURRENT_DATE,
  finish_date DATE NOT NULL,
  estimated_hours INT NOT NULL,
  description varchar(500),
  repo_link varchar(255),
  mentor varchar(255),
  max_developers INT NOT NULL DEFAULT 5,
  active BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS languages (
  id SERIAL PRIMARY KEY,
  name varchar(32) NOT NULL,
  url varchar(32) NOT NULL,
  UNIQUE (url),
  UNIQUE (name)
);

CREATE TABLE IF NOT EXISTS users_languages (
  user_id INT REFERENCES users(id) NOT NULL,
  language_id INT REFERENCES languages(id) NOT NULL,
  PRIMARY KEY (user_id, language_id)
);

CREATE TABLE IF NOT EXISTS projects_languages (
  project_id INT REFERENCES projects(id) NOT NULL,
  language_id INT REFERENCES languages(id) NOT NULL,
  PRIMARY KEY(project_id, language_id)
);

CREATE TABLE IF NOT EXISTS projects_users (
  project_id INT REFERENCES projects(id) NOT NULL,
  user_id INT REFERENCES users(id) NOT NULL,
  PRIMARY KEY (project_id, user_id)
);

CREATE TABLE IF NOT EXISTS deliverables (
  id SERIAL PRIMARY KEY,
  project_id INT REFERENCES projects(id) NOT NULL,
  date DATE NOT NULL,
  title varchar(255) NOT NULL,
  description varchar(255),
  owner varchar(255),
  complete BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS messages (
  id SERIAL PRIMARY KEY,
  project_id REFERENCES projects(id) NOT NULL,
  posted_by REFERENCES users(id) NOT NULL,
  posted_date DATE NOT NULL DEFAULT CURRENT_DATE,
  text: varchar(255),
);

