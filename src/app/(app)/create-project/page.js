"use client";

import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";
import supabase from "../../api/_db/index.js";
import React, { useState, useEffect } from "react";
import isALanguageIn from "./helper-funcs/isALanguageIn.js";
import Image from "next/image";
import formatDate from "../_utils/formatDate.js";
import "../_stylesheets/createProject.css";
import { MdOutlineDateRange } from "react-icons/md";
import { joinProject } from "../../api/_db/_models/projectsModels.js";

const getLanguages = async () => {
  const allLanguages = await supabase.from("languages").select();
  return allLanguages.data.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });
};

const applyFunc = (func, newValue) => {
  func(newValue);
};

export default function CreateProject() {
  const [title, setTitle] = useState("");
  const [engineers, setEngineers] = useState(5);
  const [allLanguages, setAllLanguages] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [hours, setHours] = useState(4);
  const [repo, setRepo] = useState("");
  const router = useRouter();

  useEffect(() => {
    getLanguages().then((data) => {
      setAllLanguages(data);
    });
  }, []);

  const searchLanguages = (input) => {
    return allLanguages.filter((language) => {
      return (
        language.name.slice(0, input.length).toLowerCase() ===
        input.toLowerCase()
      );
    });
  };

  const update = {
    title: applyFunc.bind(null, setTitle),
    engineers: applyFunc.bind(null, setEngineers),
    languages: applyFunc.bind(null, setLanguages),
    description: applyFunc.bind(null, setDescription),
    startDate: applyFunc.bind(null, setStartDate),
    endDate: applyFunc.bind(null, setEndDate),
    repo: applyFunc.bind(null, setRepo),
  };

  const onSubmit = async () => {
    if (
      title &&
      engineers &&
      languages.length > 0 &&
      description &&
      startDate &&
      endDate &&
      startDate <= endDate
    ) {
      const { data: userId, error: idError } = await supabase.auth.getSession();
      let newId = uuidv4();
      if (idError) {
        console.error(idError);
        return;
      }
      const start = new Date(startDate).toISOString().split("T")[0];
      const end = new Date(endDate).toISOString().split("T")[0];
      const { error } = await supabase.from("projects").insert({
        id: newId,
        title,
        active: true,
        owner: userId.session.user.id,
        description,
        max_developers: engineers,
        repo_link: repo ? repo : "https://github.com/dashboard",
        start_date: start,
        finish_date: end,
        estimated_hours: 4,
      });
      if (error) {
        console.error(error);
        return;
      }
      await languages.forEach(async (language) => {
        const { error: insertError } = await supabase
          .from("projects_languages")
          .insert({ project_id: newId, language_id: language.id });
        if (insertError) {
          console.error(insertError);
          return;
        }
      });
      joinProject(newId)
        .then(() => {
          router.push(`/my-projects`);
        })
        .catch((err) => {
          console.error(err);
          return;
        });
    } else if (startDate > endDate) {
      alert("Start date cannot be after end date!");
    } else {
      alert("Please fill out all fields!");
    }
  };

  const [searchInput, setSearchInput] = useState("");
  const maximumSearchResults = 8;
  return (
    <div className="create-project-main-container">
      <h1 className="create-a-project-header">CREATE A NEW PROJECT</h1>
      <div className="create-project">
        <div className="create-project-left-container">
          <div className="project-title-engineers">
            <div className="create-project-title">
              <p className="create-project-text">Project Title</p>
              <input
                className="project-title-input"
                value={title}
                onChange={(e) => update.title(e.target.value)}
                type="text"
                placeholder="Project Title"
              />
            </div>

            <div className="create-project-engineers">
              <p className="create-project-text">Engineers</p>
              <select
                className="select-engineers"
                defaultValue={5}
                name="engineers"
                onChange={(e) => update.engineers(e.target.value)}
              >
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
              </select>
            </div>
          </div>
          <div className="create-project-description">
            <p className="create-project-text">Project Description</p>
            <textarea
              value={description}
              onChange={(e) => update.description(e.target.value)}
              className="create-project-description-text"
              type="text"
              placeholder="Project Description"
            />
          </div>
          <div className="select-dates-start-end">
            <div className="create-project-start-date">
              <p className="create-project-text">Start Date</p>
              <input
                value={
                  String(startDate.getFullYear()) +
                  "-" +
                  String(startDate.getMonth() + 1).padStart(2, "0") +
                  "-" +
                  String(startDate.getDate()).padStart(2, "0")
                }
                onChange={(e) => {
                  const chosenDate = new Date(e.target.value);
                  chosenDate.setDate(chosenDate.getDate() + 1);
                  update.startDate(chosenDate);
                }}
                className="create-project-start-date-input"
                id="start-date-input"
                type="date"
                placeholder="Start Date"
              />
            </div>

            <div className="create-project-end-date">
              <p className="create-project-text">End Date</p>
              <input
                value={
                  String(endDate.getFullYear()) +
                  "-" +
                  String(endDate.getMonth() + 1).padStart(2, "0") +
                  "-" +
                  String(endDate.getDate() + 2).padStart(2, "0")
                }
                onChange={(e) => {
                  const chosenDate = new Date(e.target.value);
                  chosenDate.setDate(chosenDate.getDate() - 1);
                  update.endDate(chosenDate);
                }}
                className="create-project-end-date-input"
                type="date"
                placeholder="End Date"
              />
            </div>
          </div>
        </div>
        <div className="create-project-right-container">
          <div className="create-project-languages">
            <p className="create-project-text">Languages</p>
            <input
              type="text"
              className="create-project-search-bar"
              id="searchBar"
              placeholder="Search..."
              onChange={(e) => setSearchInput(e.target.value)}
            />
            {searchInput !== "" && (
              <div className="languageSearchResults">
                {searchLanguages(searchInput)
                  .slice(0, maximumSearchResults)
                  .map(({ id, name, url }) => (
                    <div
                      key={name}
                      className="create-project-single-language"
                      onClick={() => {
                        if (isALanguageIn({ id, name, url }, languages)) {
                          update.languages(
                            languages.filter((l) => l.name !== name)
                          );
                        } else {
                          update.languages([...languages, { id, name, url }]);
                        }
                      }}
                    >
                      {name}
                    </div>
                  ))}
              </div>
            )}
            <ul className="create-project-languages-icons">
              {languages.map((language) => (
                <img
                  className="create-project-language-icon"
                  alt={language.name}
                  src={`https://skillicons.dev/icons?i=${language.url}`}
                  key={language.url}
                  onClick={() =>
                    update.languages(languages.filter((l) => l !== language))
                  }
                />
              ))}
            </ul>
          </div>
          <div className="create-project-repo-link">
            <p className="create-project-text">Project Repo</p>
            <input
              className="project-repo-input"
              value={repo}
              onChange={(e) => update.repo(e.target.value)}
              type="text"
              placeholder="Project Repo Link"
            />
          </div>
          <button className="create-project-submit" onClick={onSubmit}>
            Create Project
          </button>
        </div>
      </div>
    </div>
  );
}
