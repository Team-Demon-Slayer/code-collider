'use client'

import React, { useState } from 'react';



export default function SelectLanguages() {
  return (
    <input type="text" id="searchBar" placeholder="Search..." onChange={(e) => setSearchInput(e.target.value)} />
      <ul id="searchResults">
        {searchLanguages(searchInput.slice(0, maximumResults)).map(({ name, url }) => (
          <li key={name} onClick={}>{name}</li>
        ))}
      </ul>
  )
};