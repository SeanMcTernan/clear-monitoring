// Intercom API credentials
const token = require('../credentials/credentials');

// Configuration for the Intercom headers
const config = {
  headers: {
    Authorization: `Bearer ${token.bearer}`,
    Accept: 'application/json',
    'Intercom-Version': '2.0',
    'Content-Type': 'application/json',
  },
};

// The body parameters to close conversations - Note admin ID is set to Admin Sean Mc Ternan
const closeBodyParameters = {
  message_type: 'close',
  type: 'close',
  admin_id: 1820562,
};

// Intecom Api Call for closing
const closeURL = 'https://api.intercom.io/conversations/';

// The body parameters to search for including page number
const recursiveSearchBody = {
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
  pagination: {
    starting_after: '',
  },
};

// The parameters set to search for
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

// Intecom Api Call for searching
const searchUrl = 'https://api.intercom.io/conversations/search?';


module.exports = {
  config, closeBodyParameters, closeURL, recursiveSearchBody, searchBodyParameters, searchUrl,
};
