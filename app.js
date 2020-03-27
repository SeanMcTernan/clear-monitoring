const fs = require('fs');
const pLimit = require('p-limit');
const request = require('request');

const input = 'data.csv';
const token = require('./credentials');


const limit = pLimit(3);
const data = fs.readFileSync(input, 'utf8');
const messages = data.split('\n');

const promises = [];
messages.forEach((message) => {
  const messageid = message.replace('\r', '');
  const options = {
    method: 'PUT',
    url: `https://app2.simpletexting.com/rest/admin/monitoring/${messageid}/archive?country=ca`,
    headers: {
      RememberMeToken: token.rememberMe,
    },
  };

  const p = request(options, (error) => {
    if (error) throw new Error(error);
  });
  promises.push(limit(() => p));
});
