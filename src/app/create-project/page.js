"use client"

import React, { useState, useEffect } from "react";
import searchLanguages from './helper-funcs/searchLanguages';

const [title, setTitle] = useState('My Project');
const [engineers, setEngineers] = useState(5);
const [languages, setLanguages] = useState([]);
const [description, setDescription] = useState('My Project Description');
const [startDate, setStartDate] = useState(new Date());
const [scope, setScope] = useState({
  days: 5,
  hours: 5,
});

const [searchInput, setSearchInput] = useState('');
const maximumSearchResults = 8;

const onSubmit = (e) => {
  e.preventDefault();
  console.log([title, engineers, languages, description, startDate, scope]);
};

const setState = (setter, newValue) => {
  setter(newValue);
};

const update = {
  title: setState.bind(null, setTitle),
  engineers: setState.bind(null, setEngineers),
  languages: setState.bind(null, setLanguages),
  description: setState.bind(null, setDescription),
  startDate: setState.bind(null, setStartDate),
  scope: setState.bind(null, setScope),
};

export default function CreateProject() {
  return (
    <div className='create-project'>
      <div className='create-project-title'>
        Project Title
        <input
          value={title}
          onChange={(e) => update.title(e.target.value)}
          className='create-project-title'
          type='text'
          placeholder='Project Title' />
      </div>

      <div className='create-project-engineers'>
        Engineers
        <select name='engineers' onChange={(e) => update.engineers(e.target.value)}>
          <option value='1'>1</option>
          <option value='2'>2</option>
          <option value='3'>3</option>
          <option value='4'>4</option>
          <option value='5'>5</option>
        </select>
      </div>

      <div className='create-project-languages'>
        Languages
        <input type="text" id="searchBar" placeholder="Search..." onChange={(e) => setSearchInput(e.target.value)} />
        <ul className='languageSearchResults'>
          {searchLanguages(searchInput.slice(0, maximumSearchResults)).map(({ name, url }) => (
            <li key={name} onClick={() => update.languages([...languages, name])}>{name}</li>
          ))}
        </ul>
      </div>

      <div className='create-project-description'>
        Project Description
        <input
          value={description}
          onChange={(e) => update.description(e.target.value)}
          className='create-project-description'
          type='text'
          placeholder='Project Description' />
      </div>

      <div className='create-project-start-date'>
        Start Date
        <input
          value={startDate}
          onChange={(e) => update.startDate(e.target.value)}
          className='create-project-start-date'
          type='date'
          placeholder='Start Date' />
      </div>

      <div className='create-project-scope'>
        No. of Days
        <select name='days' onChange={(e) => update.scope({ ...scope, days: e.target.value })}>
          <option value='1'>1</option>
          <option value='2'>2</option>
          <option value='3'>3</option>
          <option value='4'>4</option>
          <option default value='5'>5</option>
        </select>
        No. of Hours
        <select name='hours' onChange={(e) => update.scope({ ...scope, hours: e.target.value })}>
          <option value='1'>1</option>
          <option value='2'>2</option>
          <option value='3'>3</option>
          <option value='4'>4</option>
          <option default value='5'>5</option>
        </select>
      </div>

      <div className='create-project-submit'>
        <button onClick={onSubmit}>Submit</button>
      </div>
    </div>
  );
};