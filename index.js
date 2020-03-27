const axios = require('axios');
const pLimit = require('p-limit');
const token = require('./credentials');


const searchUrl = 'https://api.intercom.io/conversations/search?';
const limit = pLimit(3);

const searchBodyParameters = {
  query: {
    operator: 'AND',
    value: [
      {
        field: 'source.author.id',
        operator: '=',
        value: '5e700e057f912ce67407c127',
      },
      {
        field: 'source.subject',
        operator: '~',
        value: 'compliance',
      },
      {
        field: 'open',
        operator: '=',
        value: true,
      },
    ],
  },
};
const closeBodyParameters = {
  message_type: 'close',
  type: 'close',
  admin_id: 1820562,
};

const config = {
  headers: {
    Authorization: `Bearer ${token.bearer}`,
    Accept: 'application/json',
    'Intercom-Version': '2.0',
    'Content-Type': 'application/json',
  },
};

const listOfConversations = [];

axios
  .post(searchUrl, searchBodyParameters, config)
  .then((response) => {
    let pageNumber = response.data.pages.total_pages;
    const promises = [];
    while (pageNumber !== 0) {
      const p = axios
        .post(`${searchUrl}&page=${pageNumber}`, searchBodyParameters, config)
        // eslint-disable-next-line no-shadow
        .then((response) => {
          const { conversations } = response.data;
          conversations.forEach((conversation) => {
            listOfConversations.push(conversation.id);
          });
        })
        .catch((error) => {
          console.log(
            `Error. Failed to get conversation ID. Server returned - ${error.response.status}`,
          );
        });
      promises.push(limit(() => p));
      pageNumber -= 1;
    }
    return Promise.all(promises);
  })
  .then(() => {
    listOfConversations.forEach((conversation) => console.log(conversation));
    const promises = [];
    listOfConversations.forEach((conversation) => {
      const p = axios
        .post(
          `https://api.intercom.io/conversations/${conversation}/parts`,
          closeBodyParameters,
          config,
        )
        .catch((error) => {
          console.log(
            `Error. Failed to close conversations. Server Returned - ${error.response.status}`,
          );
        });
      promises.push(limit(() => p));
    });
  })
  .catch((error) => {
    console.log(
      `Error. Failed to get number of pages. Server Returned - ${error.response.status}`,
    );
  });
