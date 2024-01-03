"use client"

import React, { useState, useEffect } from "react";
import searchLanguages from './helper-funcs/searchLanguages';
import Image from 'next/image';
import formatDate from '../_utils/formatDate.js';
import '../_stylesheets/createProject.css'

const applyFunc = (func, newValue) => {
  func(newValue);
};

export default function CreateProject() {
  const [title, setTitle] = useState('My Project');
  const [engineers, setEngineers] = useState(5);
  const [languages, setLanguages] = useState([]);
  const [description, setDescription] = useState('My Project Description');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const update = {
    title: applyFunc.bind(null, setTitle),
    engineers: applyFunc.bind(null, setEngineers),
    languages: applyFunc.bind(null, setLanguages),
    description: applyFunc.bind(null, setDescription),
    startDate: applyFunc.bind(null, setStartDate),
    endDate: applyFunc.bind(null, setEndDate),
  };

  const onSubmit = () => {
    console.log([title, engineers, languages, description, Date.parse(startDate), Date.parse(endDate)]);
    if (title && engineers && languages && description && startDate && endDate && startDate <= endDate) {
      alert('Project Created!');
    } else if (startDate > endDate) {
      alert('Start date cannot be after end date!');
    } else {
      alert('Please fill out all fields!');
    }
  };

  const [searchInput, setSearchInput] = useState('');
  const maximumSearchResults = 8;
  return (
    <div className='create-project'>
      <div className='create-project-title'>
        <p className='create-project-text'>Project Title</p>
        <input
          value={title}
          onChange={(e) => update.title(e.target.value)}
          type='text'
          placeholder='Project Title' />
      </div>

      <div className='create-project-engineers'>
      <p className='create-project-text'>Engineers</p>
        <select defaultValue={5} name='engineers' onChange={(e) => update.engineers(e.target.value)}>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
      </div>

      <div className='create-project-start-date'>
      <p className='create-project-text'>Start Date</p>
        <input
          value={String(startDate.getFullYear()) + '-' + String(startDate.getMonth() + 1).padStart(2, '0') + '-' + String(startDate.getDate()).padStart(2, '0')}
          onChange={(e) => {
            const chosenDate = new Date(e.target.value);
            chosenDate.setDate(chosenDate.getDate() + 1);
            update.startDate(chosenDate);
          }}
          className='create-project-start-date-input'
          id='start-date-input'
          type='date'
          placeholder='Start Date' />
      </div>

      <div className='create-project-end-date'>
      <p className='create-project-text'>End Date</p>
        <input
          value={String(endDate.getFullYear()) + '-' + String(endDate.getMonth() + 1).padStart(2, '0') + '-' + String(endDate.getDate()).padStart(2, '0')}
          onChange={(e) => {
            const chosenDate = new Date(e.target.value);
            chosenDate.setDate(chosenDate.getDate() - 1);
            update.endDate(chosenDate);
          }}
          className='create-project-end-date-input'
          type='date'
          placeholder='End Date' />
      </div>

      <div className='create-project-description'>
      <p className='create-project-text'>Project Description</p>
        <textarea
          value={description}
          onChange={(e) => update.description(e.target.value)}
          className='create-project-description'
          type='text'
          placeholder='Project Description' />
      </div>

      <div className='create-project-languages'>
      <p className='create-project-text'>Languages</p>
        <input type="text" id="searchBar" placeholder="Search..." onChange={(e) => setSearchInput(e.target.value)} />
        <ul className='languageSearchResults'>
          {searchLanguages(searchInput.slice(0, maximumSearchResults)).map(({ name, url }) => (
            <li key={name} onClick={() => update.languages([...languages, name])}>{name}</li>
          ))}
        </ul>
        <ul className='create-project-languages-icons'>
          {languages.map((language) => (
            <li key={language} onClick={() => update.languages(languages.filter((l) => l !== language))}>
              <Image alt={language} src={`https://skillicons.dev/icons?i=${language}`} />
            </li>
          ))}
        </ul>
      </div>

      <div className='create-project-submit'>
        <button onClick={onSubmit}>Submit</button>
      </div>
    </div>
  );
};