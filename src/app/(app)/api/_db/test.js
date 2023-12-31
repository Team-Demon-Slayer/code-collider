import pkg from "./_models/projectsModels.js";
const { getProject } = pkg;
// const deliverables = require("./_models/deliverablesModels");
// const messages = require("./_models/messagesModels");
// const users = require("./_models/usersModels");
// const { addWeeks, format } = require("date-fns");

const deliverablesDate = addWeeks(new Date(), 1);

getProject("c7791ad6-a506-11ee-a7fd-02c6baa627c7")
  .then((res) => {
    console.log("Project");
    console.log(res);
    console.log("Languages");
    console.log(res.languages);
  })
  .catch((err) => {
    console.log(JSON.stringify(err.message));
  });

// deliverables
//   .getDeliverables("c7791ad6-a506-11ee-a7fd-02c6baa627c7", deliverablesDate)
//   .then((res) => {
//     console.log("Deliverables");
//     console.log(res);
//   })
//   .catch((err) => {
//     console.log(JSON.stringify(err.message));
//   });

// messages
//   .getMessages("c7791ad6-a506-11ee-a7fd-02c6baa627c7")
//   .then((res) => {
//     console.log("Messages");
//     console.log(res[0].messages);
//   })
//   .catch((err) => {
//     console.log(JSON.stringify(err.message));
//   });

// users
//   .getMiniUser("55b7811c-a506-11ee-8cf5-02c6baa627c7")
//   .then((res) => {
//     console.log("Mini User");
//     console.log(res);
//   })
//   .catch((err) => {
//     console.log(JSON.stringify(err.message));
//   });

// users
//   .getExpandedUser("55b7811c-a506-11ee-8cf5-02c6baa627c7")
//   .then((res) => {
//     console.log("Expanded User");
//     console.log(res);
//   })
//   .catch((err) => {
//     console.log(JSON.stringify(err.message));
//   });

// projects
//   .getProjectPageByLanguage(2, 1)
//   .then((res) => {
//     console.log("Project Page");
//     console.log(res);
//   })
//   .catch((err) => {
//     console.log(JSON.stringify(err.message));
//   });
