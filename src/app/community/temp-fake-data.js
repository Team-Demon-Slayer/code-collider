export const projects = [
  {
      title: "Code Harmony",
      languages: [
          { name: "JavaScript", badge_url: "https://example.com/js_badge" },
          { name: "Python", badge_url: "https://example.com/python_badge" }
      ],
      content: "A platform for collaborative coding in multiple languages.",
      isOpenToRegister: true,
      isOpenForMentorship: true,
      maxDeveloperSpot: 5,
      registeredDevelopers: [
          { name: "Alice Johnson", id: "aj123" },
          { name: "Bob Smith", id: 456 }
      ],
      registeredMentor: { name: "Dr. Ada Lovelace", id: "mentor01", language_id: "python" },
      registeredMentors: 2,
      startDate: new Date('2023-01-15'),
      finishDate: null,
      finished: false,
      upVotes: 120
  },
  {
      title: "AI Explorer",
      languages: [
          { name: "Python", badge_url: "https://example.com/python_badge" }
      ],
      content: "Exploring AI technologies with a focus on machine learning.",
      isOpenToRegister: false,
      isOpenForMentorship: true,
      maxDeveloperSpot: 3,
      registeredDevelopers: [
          { name: "Charlie Brown", id: 789 },
          { name: "Diana Ross", id: "dr987" }
      ],
      registeredMentor: { name: "Dr. Max Planck", id: "mentor02", language_id: "python" },
      registeredMentors: 1,
      startDate: new Date('2023-02-20'),
      finishDate: new Date('2023-12-20'),
      finished: false,
      upVotes: 85
  },
  {
      title: "Virtual Reality World",
      languages: [
          { name: "C#", badge_url: "https://example.com/csharp_badge" },
          { name: "Unity", badge_url: "https://example.com/unity_badge" }
      ],
      content: "Creating immersive virtual reality experiences.",
      isOpenToRegister: true,
      isOpenForMentorship: false,
      maxDeveloperSpot: 5,
      registeredDevelopers: [
          { name: "Evan Grant", id: "eg101" },
          { name: "Fiona Yule", id: 202 }
      ],
      registeredMentor: { name: "Dr. Virtual Reality", id: "mentor03", language_id: "unity" },
      registeredMentors: 3,
      startDate: new Date('2023-03-05'),
      finishDate: new Date('2023-11-05'),
      finished: false,
      upVotes: 150
  }
];

export const query = (projects, keyword, language, spots, openMentor) => {
  const result = projects.filter(project => {
      if (keyword && !project.title.toLowerCase().includes(keyword.toLowerCase())) {
          return false;
      }
      if (language && !project.languages.some(l => l.name === language)) {
          return false;
      }
      if (spots && project.maxDeveloperSpot < spots) {
          return false;
      }
      if (openMentor && !project.isOpenForMentorship) {
          return false;
      }
      return true;
  });
  return result;
}
