"use client";
import { useState, useEffect } from 'react';
import { getDeliverables } from './_db/_models/deliverablesModels.js';
import { getExpandedUser } from './_db/_models/usersModels.js';
import { getProjectPage, joinProject, getMyProjects, getMyMentorProjects } from './_db/_models/projectsModels.js';

export default function Api() {

  useEffect(() => {
    getDeliverables('512b933e-aa62-11ee-b32a-02c6baa627c7')
    .then((res) => {
      console.log('Get Deliverables');
      console.log(res);
    })
    .catch((err) => {
      console.error(err);
    });

    getExpandedUser('9c202e1c-2ad3-403e-b0ee-62310138aa88')
    .then((res) => {
      console.log('Get User');
      console.log(res);
    })
    .catch((err) => {
      console.error(err);
    });

    getProjectPage()
    .then((res) => {
      console.log('Project Page');
      console.log(res);
    })
    .catch((err) => {
      console.error(err);
    });

    joinProject('512b933e-aa62-11ee-b32a-02c6baa627c7')
    .then((res) => {
      console.log('Join Project');
      console.log(res);
    })
    .catch((err) => {
      console.error(err);
    });

    getMyProjects('9c202e1c-2ad3-403e-b0ee-62310138aa88')
    .then((res) => {
      console.log('Get My Projects');
      console.log(res);
    })
    .catch((err) => {
      console.error(err);
    });

    getMyMentorProjects('9c202e1c-2ad3-403e-b0ee-62310138aa88')
    .then((res) => {
      console.log('Get My Mentor Projects');
      console.log(res);
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
    </div>
  );
}