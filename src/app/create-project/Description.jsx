"use client"

import React from 'react';

export default function Description({ description, updateDescription }) {
  <input className="create-project-description" type="text" value={description} onChange={(e) => updateDescription(e.target.value)} />
};