const mockData = {
  project_meta: [
    {
      project_id: 0,
      title: "First Project",
      owner: "timBuckToo",
      languages: [
        "https://skillicons.dev/icons?i=js",
        "https://skillicons.dev/icons?i=html",
      ],
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu ac tortor dignissim convallis aenean et tortor. Ut diam quam nulla porttitor massa id. Sed blandit libero volutpat sed cras ornare arcu. Nisi porta lorem mollis aliquam ut porttitor leo a diam. Curabitur vitae nunc sed velit dignissim sodales ut eu sem. Justo eget magna fermentum iaculis eu non diam phasellus vestibulum. Ipsum consequat nisl vel pretium lectus quam id leo. At risus viverra adipiscing at in tellus integer feugiat.",
      team: ["timBuckToo", "janeDoe", "PhilColson"],
      repo_link: "https://github.com/LukeLarson2",
      mentor: "Jeff Bezos",
    },
  ],

  deliverables: [
    {
      project_id: 0,
      date: "Mon Dec 18 2023 14:33:12 GMT-0800 (Pacific Standard Time)",
      tasks: [
        {
          task_id: 0,
          title: "Do work",
          description:
            "Like the title says, do work get paid, then do more work. rinse and repeat. over and over until the end of time.",
          owner: "timBuckToo",
          complete: false,
        },
      ],
    },
    {
      project_id: 0,
      date: "Tue Dec 19 2023 14:33:12 GMT-0800 (Pacific Standard Time)",
      tasks: [],
    },
    {
      project_id: 0,
      date: "Wed Dec 20 2023 14:33:12 GMT-0800 (Pacific Standard Time)",
      tasks: [],
    },
    {
      project_id: 0,
      date: "Thu Dec 21 2023 14:33:12 GMT-0800 (Pacific Standard Time)",
      tasks: [],
    },
    {
      project_id: 0,
      date: "Fri Dec 22 2023 14:33:12 GMT-0800 (Pacific Standard Time)",
      tasks: [
        {
          task_id: 1,
          title: "Do more work",
          owner: "timBuckToo",
        },
      ],
    },
    {
      project_id: 0,
      date: "Sat Dec 23 2023 14:33:12 GMT-0800 (Pacific Standard Time)",
      tasks: [],
    },
    {
      project_id: 0,
      date: "Sun Dec 24 2023 14:33:12 GMT-0800 (Pacific Standard Time)",
      tasks: [
        {
          task_id: 2,
          title: "And more work",
          owner: "timBuckToo",
        },
        {
          task_id: 3,
          title: "And mooore work",
          owner: "timBuckToo",
        },
      ],
    },
  ],

  messages: [
    {
      project_id: 0,
      message_id: 0,
      posted_by: "timBuckToo",
      posted_date: new Date(),
      text: "Hi team, its timBuckToo. I'm excited to work with you all!",
    },
    {
      project_id: 0,
      message_id: 1,
      posted_by: "janeDoe",
      posted_date: new Date(),
      text: "Me too lets go!",
    },
    {
      project_id: 0,
      message_id: 2,
      posted_by: "PhilColson",
      posted_date: new Date(),
      text: "A team that trusts is a team that triumphs!",
    },
    {
      project_id: 0,
      message_id: 3,
      posted_by: "timBuckToo",
      posted_date: new Date(),
      text: "That was a bit much there Phil, but I appreciate the enthusiasm.",
    },
  ],
};

export default mockData;
