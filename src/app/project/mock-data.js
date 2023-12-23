const mockData = {
  project_meta: {
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

  deliverables: [
    {
      date: new Date(),
      tasks: [
        {
          task_id: 0,
          title: "Do work",
          owner: "timBuckToo",
        },
      ],
    },
  ],

  task: {
    task_id: 0,
    title: "Do work",
    description: "Like the title says, do work",
    owner: null,
    due_date: new Date(),
    complete: false,
  },

  messages: [
    {
      message_id: 0,
      posted_by: "timBuckToo",
      posted_date: new Date(),
      text: "Hi team, its timBuckToo. I'm excited to work with you all!",
    },
    {
      message_id: 1,
      posted_by: "janeDoe",
      posted_date: new Date(),
      text: "Me too lets go!",
    },
    {
      message_id: 2,
      posted_by: "PhilColson",
      posted_date: new Date(),
      text: "A team that trusts is a team that triumphs!",
    },
    {
      message_id: 3,
      posted_by: "timBuckToo",
      posted_date: new Date(),
      text: "That was a bit much there Phil, but I appreciate the enthusiasm.",
    },
  ],
};

export default mockData;
