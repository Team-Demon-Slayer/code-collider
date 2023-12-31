"use client";
import { useState, useEffect } from 'react';
import { getDeliverables } from './_db/_models/deliverablesModels.js';
import { getExpandedUser } from './_db/_models/usersModels.js';
import {
  getProjectPage,
  joinProject,
  getMyProjects,
  getMyMentorProjects,
  getCurrentProject,
  getFilteredProjectsPageByLanguage,
  getFilteredProjectsPage,
  leaveProject
} from './_db/_models/projectsModels.js';

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

    // joinProject('512b933e-aa62-11ee-b32a-02c6baa627c7')
    // .then((res) => {
    //   console.log('Join Project');
    //   console.log(res);
    // })
    // .catch((err) => {
    //   console.error(err);
    // });

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

    getCurrentProject('9c202e1c-2ad3-403e-b0ee-62310138aa88')
    .then((res) => {
      console.log('Get My Current Project');
      console.log(res);
    })
    .catch((err) => {
      console.error(err);
    });

    getFilteredProjectsPageByLanguage('rails', true, 1, 1, null, null, null, false, 'pax')
    .then((res) => {
      console.log('Filtered Projects Page By Language');
      console.log(res);
    })
    .catch((err) => {
      console.error(err);
    });

    getFilteredProjectsPage(true, 1, 5, null, null, null, false, 'pix')
    .then((res) => {
      console.log('Filtered Projects Page');
      console.log(res);
    })
    .catch((err) => {
      console.error(err);
    });

    leaveProject('61e4cbc8-0abe-4c29-9ab1-68d9f44139bc')
    .then((res) => {
      console.log('Leave Project');
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