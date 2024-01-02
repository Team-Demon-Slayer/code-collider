"use client"

import React, { useState, useEffect } from "react";
import ProjectTitle from "./ProjectTitle.jsx";
import Description from "./Description.jsx";
import SelectEngineers from "./SelectEngineers.jsx";
import SelectLanguages from "./SelectLanguages.jsx";
import StartDate from "./StartDate.jsx";
import Scope from "./Scope.jsx";

const [title, setTitle] = useState('My Project');
const [engineers, setEngineers] = useState(5);
const [languages, setLanguages] = useState([]);
const [description, setDescription] = useState('My Project Description');
const [startDate, setStartDate] = useState(new Date());
const [scope, setScope] = useState({
  days: 5,
  hours: 5,
});

const onSubmit = (e) => {
  e.preventDefault();
  console.log(e.formData);
};

const setState = (setter, newValue) => {
  setter(newValue);
};

const setters = {
  updateTitle: setState.bind(null, setTitle),
  updateEngineers: setState.bind(null, setEngineers),
  updateLanguages: setState.bind(null, setLanguages),
  updateDescription: setState.bind(null, setDescription),
  updateStartDate: setState.bind(null, setStartDate),
  updateScope: setState.bind(null, setScope),
};

export default function CreateProject() {
  return (

  );
};