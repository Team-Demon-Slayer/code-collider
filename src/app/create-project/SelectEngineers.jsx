"use client"

import React, { useState } from 'react';

export default function ProjectEngineers({ updateEngineers }) {
  return (
    <div className='project-engineers'>
      <select name="engineers" id="engineers" onChange={(e) => updateEngineers(e.target.value)}>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
    </div>
  );
};