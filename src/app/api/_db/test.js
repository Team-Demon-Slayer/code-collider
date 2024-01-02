const getProject = require("./_queries/getProject");
const getDeliverables = require("./_queries/getDeliverables");
const getMessages = require("./_queries/getMessages");
const { addWeeks } = require("date-fns");

const date = addWeeks(new Date(), 1);

getProject("094b3c5a-a999-11ee-bfb5-02c6baa627c7")
  .then((res) => {
    console.log("Project");
    console.log(res);
    console.log("Languages");
    console.log(res[0].languages);
  })
  .catch((err) => {
    console.log(JSON.stringify(err.message));
  });

getDeliverables("094b3c5a-a999-11ee-bfb5-02c6baa627c7", date)
  .then((res) => {
    console.log("Deliverables");
    console.log(res);
  })
  .catch((err) => {
    console.log(JSON.stringify(err.message));
  });

getMessages("094b3c5a-a999-11ee-bfb5-02c6baa627c7")
  .then((res) => {
    console.log("Messages");
    console.log(res[0].messages);
  })
  .catch((err) => {
    console.log(JSON.stringify(err.message));
  });
