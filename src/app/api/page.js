"use client";
import { useState, useEffect } from 'react';
import { getDeliverables } from './_db/_models/deliverablesModels.js';
import { getExpandedUser } from './_db/_models/usersModels.js';
import { getProjectPage } from './_db/_models/projectsModels.js';

export default function Api() {
  const [deliverables, setDeliverables] = useState({});
  const [user, setUser] = useState({});
  const [projects, setProjects] = useState({});


  useEffect(() => {
    getDeliverables('512b933e-aa62-11ee-b32a-02c6baa627c7')
    .then((res) => {
      setDeliverables(res);
    })
    .catch((err) => {
      console.error(err);
    });

    getExpandedUser('9c202e1c-2ad3-403e-b0ee-62310138aa88')
    .then((res) => {
      console.log(res);
      setUser(res);
    })
    .catch((err) => {
      console.log(res);
      console.error(err);
    });

    getProjectPage()
    .then((res) => {
      console.log(res);
      setProjects(res);
    })
    .catch((err) => {
      console.error(err);
    });
  }, [])

  const divStyle = {
    marginTop: '100px'
  }

  return (
    <div>
      <div style={divStyle}>{JSON.stringify(deliverables)}</div>
      <div style={divStyle}>{JSON.stringify(user)}</div>
      <div style={divStyle}>{JSON.stringify(projects)}</div>
    </div>
  );
}