"use client"

import React from 'react';

export default function ProjectTitle({ title, updateTitle }) {
  return (
    <div>
      <input
        value={title}
        onChange={(e) => updateTitle(e.target.value)}
        className='create-project-title'
        type="text"
        placeholder="Project Title"/>
    </div>
  )
};