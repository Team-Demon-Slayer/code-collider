const getProject = require('./_queries/getProject');
const getDeliverables = require('./_queries/getDeliverables');
const getMessages = require('./_queries/getMessages');
const { addWeeks } = require('date-fns');

const date = addWeeks(new Date(), 1);

getProject('c7791ad6-a506-11ee-a7fd-02c6baa627c7')
.then((res) => {
  console.log('Project');
  console.log(res);
  console.log('Languages');
  console.log(res[0].languages);
})
.catch((err) => {
  console.log(JSON.stringify(err.message));
});

getDeliverables('c7791ad6-a506-11ee-a7fd-02c6baa627c7', date)
.then((res) => {
  console.log('Deliverables');
  console.log(res);
})
.catch((err) => {
  console.log(JSON.stringify(err.message));
});

getMessages('c7791ad6-a506-11ee-a7fd-02c6baa627c7')
.then((res) => {
  console.log('Messages');
  console.log(res[0].messages);
})
.catch((err) => {
  console.log(JSON.stringify(err.message));
});