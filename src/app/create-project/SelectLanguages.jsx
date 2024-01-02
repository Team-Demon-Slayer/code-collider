'use client'

import React, { useState } from 'react';

import searchLanguages from './helper-funcs/searchLanguages';

const [searchInput, setSearchInput] = useState('');
const maximumResults = 8;

export default function SelectLanguages() {
  return (
    <input type="text" id="searchBar" placeholder="Search..." onChange={(e) => setSearchInput(e.target.value)} />
      <ul id="searchResults">
        {searchLanguages(searchInput.slice(0, maximumResults)).map(({ name, url }) => (
          <li key={name}>{name}</li>
        ))}
      </ul>
  )
};